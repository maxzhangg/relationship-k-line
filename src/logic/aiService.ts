import React from 'react'; // <--- 加上这行
import OpenAI from "openai";

export const fetchAiAnalysis = async (apiKey: string, baseUrl: string, prompt: string, model: string) => {
  // 🧹 第一步：清洗 API Key
  // .trim() 去除首尾空格
  // .replace 暴力替换掉所有非 ASCII 字符（比如中文）
  const cleanKey = apiKey.trim().replace(/[^\x00-\x7F]/g, "");

  // 🛡️ 第二步：安全检查
  if (!cleanKey) {
    throw new Error("API Key 为空或无效");
  }
  // 如果清洗后发现长度变短了，说明用户输入了非法字符，最好报错提示
  if (cleanKey.length !== apiKey.trim().length) {
     throw new Error("API Key 中包含非法字符（如中文或全角符号），请重新输入");
  }

  // 🚀 第三步：发送请求
  
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: false,
      // ⚠️ 关键点1：尝试增加 max_tokens，防止截断
      // 如果你的模型支持，尽量设大一点，比如 4000
      // max_tokens: 4000 
    })
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  // ⚠️ 关键点2：不要直接 response.json()
  // const data = await response.json(); 
  
  // 改为先取纯文本
  const rawText = await response.text(); 
  console.log("🐛 [DEBUG] AI 原始返回内容:", rawText); // 这样你能在控制台看到断在哪里

  try {
    // 1. 尝试解析外层结构 (DeepSeek 通常返回 { choices: [...] })
    const apiResponse = JSON.parse(rawText);
    const content = apiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI 返回结构异常，未找到 content");
    }

    // 2. 清洗 content 中的 Markdown 标记 (```json ... ```)
    // 这一步非常重要，很多报错就是因为这里没洗干净
    const cleanJson = content
      .replace(/^```json\s*/, '') // 去掉开头的 ```json
      .replace(/^```\s*/, '')     // 去掉开头的 ```
      .replace(/\s*```$/, '');    // 去掉结尾的 ```

    console.log("🧹 [DEBUG] 清洗后的 JSON:", cleanJson);

    // 3. 解析最终的业务数据
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("❌ 解析失败，原始文本:", rawText);
    // 如果是截断问题，这里能看得很清楚
    throw new Error("AI 返回数据格式错误或被截断，请尝试缩减 Prompt 或增加 Token 限制");
  }
};