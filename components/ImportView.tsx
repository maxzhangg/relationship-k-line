import React, { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Upload, FileJson, AlertCircle, ArrowLeft } from 'lucide-react';
import { AnalysisResult } from '../types';

interface Props {
  onImport: (data: AnalysisResult) => void;
  onBack: () => void;
}

export const ImportView: React.FC<Props> = ({ onImport, onBack }) => {
  const { t } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError(t.invalidFile);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const json = JSON.parse(text);
        
        // Basic schema check
        if (!json.meta || !json.overall || !json.page1LoveKline) {
          throw new Error('Missing required fields');
        }
        
        onImport(json as AnalysisResult);
      } catch (err) {
        console.error(err);
        setError(t.invalidFile);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> {t.backHome}
      </button>

      <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
             <Upload className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">{t.importTitle}</h2>
        <p className="text-slate-400 mb-8">{t.importDesc}</p>

        <div 
          className={`border-2 border-dashed rounded-xl p-10 transition-all cursor-pointer ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-500/10' 
              : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
           <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             accept=".json" 
             onChange={handleChange}
           />
           <FileJson className="w-10 h-10 text-slate-500 mx-auto mb-4" />
           <p className="text-slate-300 font-medium">{t.dropFile}</p>
        </div>

        {error && (
          <div className="mt-6 p-3 bg-red-900/30 border border-red-800/50 text-red-300 rounded flex items-center gap-2 justify-center text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};