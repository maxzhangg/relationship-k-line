import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Legend
} from 'recharts';
import { LifeLinePoint, Annotation } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LifeLinePoint[];
  annotations: Annotation[];
  personAName: string;
  personBName: string;
}

const CustomTooltip = ({ active, payload, label, annotations }: any) => {
  const { t } = useLanguage();
  if (active && payload && payload.length) {
    const year = payload[0].payload.gregorianYear;
    const yearAnnotations = annotations.filter((a: any) => a.gregorianYear === year);

    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-xl text-xs text-slate-200 min-w-[200px]">
        <p className="font-bold text-sm mb-2">{year}</p>
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex justify-between items-center mb-1" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span className="font-bold">{entry.value}</span>
          </div>
        ))}
        {yearAnnotations.length > 0 && (
          <div className="mt-3 border-t border-slate-700 pt-2">
             {yearAnnotations.map((a: any, i: number) => (
               <div key={i} className="mb-1">
                 <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                    {a.who === 'BOTH' ? t.jointEvent : t.personalEvent}
                 </span>
                 <p className="font-semibold text-amber-400">{a.title}</p>
                 <p className="opacity-80 leading-tight">{a.detail}</p>
               </div>
             ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const DualLifeLineChart: React.FC<Props> = ({ data, annotations, personAName, personBName }) => {
  const { t } = useLanguage();
  // Flatten data for Recharts
  const chartData = data.map(d => ({
    year: d.gregorianYear,
    scoreA: d.personA.lifeScore,
    scoreB: d.personB.lifeScore,
    fullData: d
  }));

  return (
    <div className="w-full h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-800">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">{t.lifeLineTitle}</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={(props) => <CustomTooltip {...props} annotations={annotations} />} cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          <Line 
            type="monotone" 
            dataKey="scoreA" 
            name={personAName} 
            stroke="#38bdf8" 
            strokeWidth={3} 
            dot={{ r: 3, fill: '#38bdf8', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="scoreB" 
            name={personBName} 
            stroke="#f472b6" 
            strokeWidth={3} 
            dot={{ r: 3, fill: '#f472b6', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />

          {/* Render Annotation Dots */}
          {annotations.map((ann, i) => {
             const dataPoint = chartData.find(c => c.year === ann.gregorianYear);
             if(!dataPoint) return null;

             if (ann.who === 'A') {
               return <ReferenceDot key={i} x={ann.gregorianYear} y={dataPoint.scoreA} r={5} fill="#38bdf8" stroke="#fff" />;
             }
             if (ann.who === 'B') {
               return <ReferenceDot key={i} x={ann.gregorianYear} y={dataPoint.scoreB} r={5} fill="#f472b6" stroke="#fff" />;
             }
             // For Both, mid point
             const mid = (dataPoint.scoreA + dataPoint.scoreB) / 2;
             return <ReferenceDot key={i} x={ann.gregorianYear} y={mid} r={6} fill="#fbbf24" stroke="#fff" shape={(props: any) => (
                <circle cx={props.cx} cy={props.cy} r={6} fill="#fbbf24" stroke="white" strokeWidth={2} />
             )} />;
          })}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};