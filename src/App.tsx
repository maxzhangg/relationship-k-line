import React, { useState } from 'react';
import { UserProfile, AiResponseData } from './types/index';
import { calculateBazi } from './logic/baziCalculator';
import { fetchAiAnalysis } from './logic/aiService';
import { generateLovePrompt, generateLifePrompt } from './logic/promptTemplate';
import { BaziInput } from './components/BaziInput';
import { ApiConfig } from './components/ApiConfig';
import { LoveKLineChart } from './components/LoveKLineChart';
import { LifeDoubleChart } from './components/LifeDoubleChart';
import { Loader2 } from 'lucide-react';

const initialProfile: UserProfile = {
  name: '',
  gender: 'male',
  birthDate: '2000-01-01',
  birthTime: '12:00'
};

export default function App() {
  const [userA, setUserA] = useState<UserProfile>({...initialProfile, name: '张三', gender: 'male'});
  const [userB, setUserB] = useState<UserProfile>({...initialProfile, name: '李四', gender: 'female'});
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.deepseek.com');
  const [model, setModel] = useState('deepseek-chat');
  
  const [statusText, setStatusText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResponseData | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!apiKey) { setError('请输入 API Key'); return; }
    setLoading(true); setError(''); setResult(null);

    try {
      setStatusText('正在排盘...');
      const baziA = calculateBazi(userA);
      const baziB = calculateBazi(userB);

      const lovePrompt = generateLovePrompt(userA, baziA, userB, baziB);
      // 注意：promptTemplate 必须已经是精简版
      const lifePromptA = generateLifePrompt(userA, baziA);
      const lifePromptB = generateLifePrompt(userB, baziB);

      setStatusText('AI 正在推演未来 (预计 30-60秒)...');

      // 并发请求
      const [loveData, lifeDataA, lifeDataB] = await Promise.all([
        fetchAiAnalysis(apiKey, baseUrl, lovePrompt, model),
        fetchAiAnalysis(apiKey, baseUrl, lifePromptA, model),
        fetchAiAnalysis(apiKey, baseUrl, lifePromptB, model)
      ]);

      // 组装数据
      // ⚠️ 关键点：这里不再引用 personality/summary 等字段
      const finalData: AiResponseData = {
        loveSummary: loveData.summary || "分析完成", // 兼容处理
        loveScore: loveData.summaryScore || 80,
        loveChartPoints: loveData.loveChartPoints || [],
        reportA: lifeDataA,
        reportB: lifeDataB
      };

      setResult(finalData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '生成失败');
    } finally {
      setLoading(false);
      setStatusText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            AI 八字合盘 K 线图
          </h1>
          <p className="text-gray-400">DeepSeek 全量推演 (只看数据，不看废话)</p>
        </header>

        <ApiConfig 
          apiKey={apiKey} setApiKey={setApiKey}
          baseUrl={baseUrl} setBaseUrl={setBaseUrl}
          model={model} setModel={setModel}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <BaziInput title="🧑 对象 A" profile={userA} onChange={setUserA} />
          <BaziInput title="👩 对象 B" profile={userB} onChange={setUserB} />
        </div>

        <div className="text-center mb-12">
          <button onClick={handleGenerate} disabled={loading} className="px-8 py-3 bg-blue-600 rounded-full font-bold text-lg hover:bg-blue-500 transition disabled:opacity-50 text-white flex items-center mx-auto gap-2">
            {loading ? <Loader2 className="animate-spin" /> : '🚀 开始推演'}
          </button>
          {loading && <p className="text-blue-400 mt-2 animate-pulse">{statusText}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* 结果展示区 */}
        {result && (
          <div className="space-y-8 animate-fade-in">
            
            {/* 1. 简要八字信息 (替代原来的长篇大论) */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-gray-800 p-4 rounded border border-gray-700 text-center">
                  <h3 className="font-bold text-gray-400 mb-2">{userA.name} 八字</h3>
                  <div className="flex justify-center gap-2 text-yellow-400 font-mono text-xl">
                    {result.reportA.bazi ? result.reportA.bazi.join(' ') : "数据解析错误"}
                  </div>
               </div>
               <div className="bg-gray-800 p-4 rounded border border-gray-700 text-center">
                  <h3 className="font-bold text-gray-400 mb-2">{userB.name} 八字</h3>
                  <div className="flex justify-center gap-2 text-pink-400 font-mono text-xl">
                    {result.reportB.bazi ? result.reportB.bazi.join(' ') : "数据解析错误"}
                  </div>
               </div>
            </div>

            {/* 2. 恋爱合盘 K线 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
              <h2 className="text-2xl font-bold mb-2 text-white">❤️ 恋爱趋势</h2>
              <div className="text-4xl font-black text-pink-500 mb-4">{result.loveScore} 分</div>
              <div className="mt-4 h-64">
                <LoveKLineChart data={result.loveChartPoints} />
              </div>
            </div>

            {/* 3. 人生双曲线 (核心) */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-center text-white">📈 一生运势对比 (18-80岁)</h2>
              <LifeDoubleChart 
                dataA={result.reportA.chartPoints || []} 
                dataB={result.reportB.chartPoints || []} 
                nameA={userA.name || 'A'} 
                nameB={userB.name || 'B'} 
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}