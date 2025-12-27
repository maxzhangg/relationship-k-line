import React from 'react';

interface Props {
  apiKey: string;
  setApiKey: (v: string) => void;
  baseUrl: string;
  setBaseUrl: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
}

export const ApiConfig: React.FC<Props> = ({ apiKey, setApiKey, baseUrl, setBaseUrl, model, setModel }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
      <h3 className="text-white font-bold mb-4">⚙️ 模型配置</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Base URL</label>
          <input 
            type="text" 
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
            placeholder="https://api.deepseek.com"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">API Key</label>
          <input 
            type="password" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
            placeholder="sk-..."
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Model Name</label>
          <input 
            type="text" 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
            placeholder="deepseek-chat"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">提示：Key 仅存储在本地浏览器内存中，刷新后需重新输入。</p>
    </div>
  );
};