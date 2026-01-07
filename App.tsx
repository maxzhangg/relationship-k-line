import React, { useState, useEffect } from 'react';
import { InputForm } from './components/InputForm';
import { LoveKlineChart } from './components/LoveKlineChart';
import { DualLifeLineChart } from './components/DualLifeLineChart';
import { SummaryCard } from './components/SummaryCard';
import { ImportView } from './components/ImportView';
import { generateAstrologyData } from './services/geminiService';
import { downloadJSON, downloadMarkdown } from './services/exportService';
import { AnalysisResult, PersonInput } from './types';
import { Sparkles, Languages, Download, FileJson, FileText, Upload } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent = () => {
  const { t, language, setLanguage } = useLanguage();
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simple view state: 'home' | 'import'
  const [view, setView] = useState<'home' | 'import'>('home');

  // Handle URL Routing
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path.endsWith('/data-import')) {
        setView('import');
      } else {
        setView('home');
      }
    };

    // Check on mount
    handleUrlChange();

    // Listen for popstate (back/forward button)
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const navigateTo = (targetView: 'home' | 'import') => {
    setView(targetView);
    // Construct new URL based on base path
    const baseUrl = window.location.href.split('?')[0].split('#')[0].replace(/\/data-import$/, '');
    // Remove trailing slash if exists to avoid double slash
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    if (targetView === 'import') {
      window.history.pushState({}, '', `${cleanBase}/data-import`);
    } else {
      window.history.pushState({}, '', `${cleanBase}/`);
    }
  };

  const handleAnalyze = async (pA: PersonInput, pB: PersonInput, start: number, end: number, apiKey: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await generateAstrologyData(pA, pB, start, end, apiKey, language);
      setData(result);
    } catch (err: any) {
      setError(err.message || t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = (importedData: AnalysisResult) => {
    setData(importedData);
    // After import, we show results. We can technically keep the URL or reset it.
    // Resetting URL to home makes sense since we are now in the "Results" state which is technically the home view populated with data.
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-space-900 text-slate-200 pb-20 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-space-900/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setData(null); navigateTo('home'); }}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
               <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                {t.appTitle}
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{t.appSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
               <button 
                 onClick={() => setLanguage('en')}
                 className={`px-3 py-1 text-xs rounded-md transition-all ${language === 'en' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
               >
                 EN
               </button>
               <button 
                 onClick={() => setLanguage('zh')}
                 className={`px-3 py-1 text-xs rounded-md transition-all ${language === 'zh' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
               >
                 中文
               </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: Import */}
        {!data && view === 'import' && (
          <ImportView onImport={handleImport} onBack={() => navigateTo('home')} />
        )}

        {/* VIEW: Home / Input */}
        {!data && view === 'home' && (
           <div className="mt-8 animate-fade-in">
             <div className="text-center mb-10 max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.heroTitle}</h2>
               <p className="text-slate-400 mb-6">
                 {t.heroDesc}
               </p>
               
               {/* Import Link */}
               <div className="flex justify-center items-center gap-2 text-sm">
                 <span className="text-slate-500">{t.haveData}</span>
                 <a 
                    href="./data-import" 
                    onClick={(e) => { e.preventDefault(); navigateTo('import'); }}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                 >
                   <Upload className="w-3.5 h-3.5" /> {t.importLink}
                 </a>
               </div>
             </div>
             
             <InputForm onSubmit={handleAnalyze} isLoading={loading} />
             
             {error && (
               <div className="mt-6 p-4 bg-red-900/30 border border-red-800/50 text-red-300 rounded-lg text-center max-w-2xl mx-auto">
                 {error}
               </div>
             )}
           </div>
        )}

        {/* Loading State */}
        {loading && !data && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin reverse" style={{ animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 border-b-2 border-pink-500 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
            </div>
            <p className="mt-6 text-indigo-300 animate-pulse">{t.loading}</p>
          </div>
        )}

        {/* Results Dashboard */}
        {data && (
          <div className="space-y-8 animate-slide-up">
            
            {/* Meta & Reset */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                <p className="text-slate-500 text-sm">
                   For {data.inputEcho.personA.name} & {data.inputEcho.personB.name} • {data.inputEcho.range.startYear}-{data.inputEcho.range.endYear}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Export Buttons */}
                <div className="flex gap-2 mr-4">
                  <button 
                    onClick={() => downloadJSON(data)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 text-xs transition-colors"
                    title={t.saveJson}
                  >
                    <FileJson className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">JSON</span>
                  </button>
                  <button 
                    onClick={() => downloadMarkdown(data)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 text-xs transition-colors"
                    title={t.saveReport}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Report</span>
                  </button>
                </div>

                <button 
                  onClick={() => { setData(null); navigateTo('home'); }} 
                  className="text-sm text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4"
                >
                  {t.startNew}
                </button>
              </div>
            </div>

            {/* Summary */}
            <SummaryCard 
              overall={data.overall} 
              personA={data.inputEcho.personA} 
              personB={data.inputEcho.personB} 
            />

            {/* Page 1: Love K-Line */}
            <div className="grid lg:grid-cols-3 gap-6">
               <div className="lg:col-span-3">
                 <LoveKlineChart data={data.page1LoveKline.series} />
               </div>
            </div>

            {/* Page 2: Dual Life Line */}
            <div className="grid lg:grid-cols-3 gap-6">
               <div className="lg:col-span-3">
                 <DualLifeLineChart 
                    data={data.page2DualLifeLine.series} 
                    annotations={data.page2DualLifeLine.annotations} 
                    personAName={data.inputEcho.personA.name}
                    personBName={data.inputEcho.personB.name}
                 />
               </div>
            </div>

            <div className="text-center text-xs text-slate-600 pt-12 pb-4">
              {data.meta.note} • Generated: {new Date(data.meta.generatedAt).toLocaleString()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}