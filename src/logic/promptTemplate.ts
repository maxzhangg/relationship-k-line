import { BaziResult, UserProfile } from '../types';

// ==========================================
// 1. 恋爱合盘 Prompt (保持轻量，专注关系)
// ==========================================
export const generateLovePrompt = (
  userA: UserProfile, baziA: BaziResult, 
  userB: UserProfile, baziB: BaziResult
) => {
  return `
你是一位八字合婚专家。请只生成"恋爱关系K线"数据。
【甲方】${baziA.genderStr}，八字：${baziA.pillars.join(' ')}
【乙方】${baziB.genderStr}，八字：${baziB.pillars.join(' ')}

任务：生成 **18岁到80岁** (每年一条) 的恋爱关系数据。
**输出规则**：
1. **频率**：**每年**生成一条数据。
2. **字段**：age, score (0-100), reason (10字以内简评).
3. **波动**：分数必须有起伏，模拟真实关系的酸甜苦辣。

输出JSON结构：
{
  "summary": "合盘总评(50字)",
  "summaryScore": 85,
  "loveChartPoints": [
    {"age": 18, "score": 60, "reason": "初识悸动", "open":55, "close":60, "high":65, "low":50},
    ... (每年一条)
  ]
}`;
};

// ==========================================
// 2. 单人人生详批 Prompt (使用您提供的完整版)
// ==========================================
export const generateLifePrompt = (user: UserProfile, bazi: BaziResult) => {
  const birthYear = parseInt(user.birthDate.split('-')[0]);
  
  // 生成大运参考序列
  const daYunHint = bazi.daYunList 
    ? bazi.daYunList.map((d, i) => `第${i+1}步[${d.startAge}岁起: ${d.ganZhi}]`).join(' -> ')
    : '大运数据未生成';

  return `
=== 系统指令 (System Prompt) ===

你是一位八字命理大师。根据用户提供的四柱干支和大运信息，生成"人生K线图"数据和命理报告。

**核心规则:**
1. **年龄计算**: 采用虚岁，从 1 岁开始，直到 80 岁。
3. **评分机制**: 所有维度给出 0-10 分（注意：K线数据的 open/close/high/low 请使用 0-100 的分值以便绘图）。
4. **数据起伏**: 让评分呈现明显波动，体现"牛市"和"熊市"区别，禁止输出平滑直线。

**输出JSON结构:**
{
  "bazi": ["年柱", "月柱", "日柱", "时柱"],
  "chartPoints": [
    {"age":1,"year":${birthYear},"open":50,"close":55,"high":60,"low":45,"score":55},
    ... (共80条，覆盖 1-80 岁)
  ]
}

=== 用户提示词 (User Prompt) ===

请根据以下**已经排好的**八字四柱和**指定的大运信息**进行分析。

【基本信息】
性别：${bazi.genderStr}
姓名：${user.name || '未提供'}
出生年份：${birthYear}年 (阳历)

【八字四柱】
${bazi.pillars.join(' ')}

【大运核心参数】
1. 起运年龄：${bazi.startAge} 岁 (虚岁)。
2. 第一步大运：${bazi.firstDaYun}。
3. **排序方向**：${bazi.daYunDirection} (Forward/Backward)。

【参考大运序列】(AI请参考此序列填充 daYun 字段)
${daYunHint}

【任务执行】
1. 确认格局与喜忌。
2. 生成 **1-100 岁 (虚岁)** 的人生流年K线数据。

请务必只返回纯JSON格式数据。
`;
};