import React from 'react';
import { Overall, Dimension, PersonInput } from '../types';
import { Star, AlertTriangle, TrendingUp, Scroll } from 'lucide-react';

interface Props {
  overall: Overall;
  personA: PersonInput;
  personB: PersonInput;
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

const BaziCard = ({ person }: { person: PersonInput }) => {
  if (!person.bazi) return null;
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-indigo-300 text-sm">{person.name}</span>
        <span className="text-[10px] text-slate-500 uppercase">{person.gender}</span>
      </div>
      <div className="grid grid-cols-4 gap-1 text-center">
        <div className="bg-slate-900 rounded p-1">
          <div className="text-[10px] text-slate-500">Year</div>
          <div className="text-xs font-mono font-bold text-white">{person.bazi.yearPillar}</div>
        </div>
        <div className="bg-slate-900 rounded p-1">
          <div className="text-[10px] text-slate-500">Month</div>
          <div className="text-xs font-mono font-bold text-white">{person.bazi.monthPillar}</div>
        </div>
        <div className="bg-slate-900 rounded p-1 ring-1 ring-indigo-500/50">
          <div className="text-[10px] text-indigo-400">Day</div>
          <div className="text-xs font-mono font-bold text-indigo-200">{person.bazi.dayPillar}</div>
        </div>
        <div className="bg-slate-900 rounded p-1">
          <div className="text-[10px] text-slate-500">Hour</div>
          <div className="text-xs font-mono font-bold text-white">{person.bazi.hourPillar}</div>
        </div>
      </div>
      {(person.bazi as any).dayMasterElement && (
        <div className="mt-2 text-[10px] text-center text-slate-400">
          Day Master: <span className="text-white font-semibold">{(person.bazi as any).dayMasterElement}</span>
        </div>
      )}
    </div>
  );
};

export const SummaryCard: React.FC<Props> = ({ overall, personA, personB }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Main Summary */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" /> Cosmic Verdict
          </h3>
          <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
            {overall.summary}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-emerald-900/20 border border-emerald-900/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-1">
                <TrendingUp className="w-4 h-4" /> Golden Years
              </div>
              <div className="flex gap-2 flex-wrap">
                {overall.bestYears.map(y => (
                  <span key={y} className="bg-emerald-900/50 text-emerald-300 px-2 py-0.5 rounded text-xs">{y}</span>
                ))}
              </div>
            </div>

            <div className="flex-1 bg-rose-900/20 border border-rose-900/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-bold mb-1">
                <AlertTriangle className="w-4 h-4" /> Challenging Years
              </div>
              <div className="flex gap-2 flex-wrap">
                {overall.riskYears.map(y => (
                  <span key={y} className="bg-rose-900/50 text-rose-300 px-2 py-0.5 rounded text-xs">{y}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BaZi Profile Display */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
             <Scroll className="w-5 h-5 text-indigo-400" /> BaZi Blueprint
           </h3>
           <div className="grid md:grid-cols-2 gap-4">
             <BaziCard person={personA} />
             <BaziCard person={personB} />
           </div>
        </div>
      </div>

      {/* Side Dimensions */}
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 h-fit">
        <h3 className="text-lg font-semibold text-white mb-4">Compatibility Dimensions</h3>
        <div className="space-y-1">
          <DimensionBar label="Communication" data={overall.dimensions.communication} />
          <DimensionBar label="Values" data={overall.dimensions.values} />
          <DimensionBar label="Intimacy" data={overall.dimensions.intimacy} />
          <DimensionBar label="Stability" data={overall.dimensions.stability} />
          <DimensionBar label="Family" data={overall.dimensions.family} />
          <DimensionBar label="Career" data={overall.dimensions.career} />
          <DimensionBar label="Wealth" data={overall.dimensions.wealth} />
        </div>
        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">{overall.summaryScore}</span>
            <span className="text-slate-500 text-sm ml-1">/ 100</span>
            <p className="text-xs text-slate-400 mt-2 font-medium tracking-wide uppercase">Overall Synergy</p>
        </div>
      </div>
    </div>
  );
};