import React from 'react';
import { Overall, Dimension } from '../types';
import { Star, AlertTriangle, TrendingUp } from 'lucide-react';

interface Props {
  overall: Overall;
}

const DimensionBar = ({ label, data }: { label: string; data: Dimension }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-slate-400 font-medium uppercase tracking-wider">{label}</span>
      <span className="text-white font-bold">{data.score}/10</span>
    </div>
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
        style={{ width: `${data.score * 10}%` }}
      />
    </div>
    <p className="text-[10px] text-slate-500 mt-1">{data.comment}</p>
  </div>
);

export const SummaryCard: React.FC<Props> = ({ overall }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" fill="currentColor" /> Cosmic Verdict
        </h3>
        <p className="text-slate-300 leading-relaxed mb-6">
          {overall.summary}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
           <div className="flex-1 bg-emerald-900/20 border border-emerald-900/50 p-3 rounded-lg">
             <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-1">
               <TrendingUp className="w-4 h-4" /> Golden Years
             </div>
             <div className="flex gap-2">
               {overall.bestYears.map(y => (
                 <span key={y} className="bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded text-xs">{y}</span>
               ))}
             </div>
           </div>

           <div className="flex-1 bg-rose-900/20 border border-rose-900/50 p-3 rounded-lg">
             <div className="flex items-center gap-2 text-rose-400 text-sm font-bold mb-1">
               <AlertTriangle className="w-4 h-4" /> Challenging Years
             </div>
             <div className="flex gap-2">
               {overall.riskYears.map(y => (
                 <span key={y} className="bg-rose-900/50 text-rose-300 px-2 py-0.5 rounded text-xs">{y}</span>
               ))}
             </div>
           </div>
        </div>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Compatibility Dimensions</h3>
        <div className="space-y-1">
          <DimensionBar label="Communication" data={overall.dimensions.communication} />
          <DimensionBar label="Values" data={overall.dimensions.values} />
          <DimensionBar label="Intimacy" data={overall.dimensions.intimacy} />
          <DimensionBar label="Stability" data={overall.dimensions.stability} />
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <span className="text-4xl font-bold text-white">{overall.summaryScore}</span>
            <span className="text-slate-500 text-sm ml-1">/ 100</span>
            <p className="text-xs text-slate-400 mt-1">Overall Synergy</p>
        </div>
      </div>
    </div>
  );
};