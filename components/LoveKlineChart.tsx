import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { LoveKlinePoint } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LoveKlinePoint[];
}

// Custom Shape for the Candlestick
const Candlestick = (props: any) => {
  const { x, y, width, height, payload } = props;
  
  if (!payload) return null;

  const { open, close, high, low } = payload;
  
  const isUp = close > open;
  const stroke = isUp ? '#f87171' : '#4ade80'; 
  const fill = isUp ? '#ef4444' : '#22c55e';

  // Safe calculation logic repeated from original
  // Since we use `wickRange` [low, high] as the bar data, `y` is top of wick, `height` is length of wick.
  
  const range = high - low;
  const unitH = range === 0 ? 0 : height / range;
  
  // Distance from Top of Bar (High) to Top of Body (Max(Open,Close))
  const topOffset = (high - Math.max(open, close)) * unitH;
  // Body Height
  const bodyHeight = Math.abs(open - close) * unitH;
  
  const isDoji = bodyHeight < 2;
  const finalBodyHeight = isDoji ? 2 : bodyHeight;

  return (
    <g>
      {/* Wick */}
      <line 
        x1={x + width / 2} 
        y1={y} 
        x2={x + width / 2} 
        y2={y + height} 
        stroke={stroke} 
        strokeWidth={1.5} 
      />
      {/* Body */}
      <rect 
        x={x} 
        y={y + topOffset} 
        width={width} 
        height={finalBodyHeight} 
        fill={fill} 
        stroke="none"
        rx={2}
      />
    </g>
  );
};

// Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  const { t } = useLanguage();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-xl text-xs text-slate-200">
        <p className="font-bold text-sm mb-1">{data.gregorianYear} ({data.ganZhiYear})</p>
        <p className="text-slate-400">{t.score}: {data.close}</p>
        <p className="text-emerald-400">{t.high}: {data.high}</p>
        <p className="text-rose-400">{t.low}: {data.low}</p>
        <p className="mt-2 italic opacity-80">{data.reason}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {data.tags.map((t: string, i: number) => (
            <span key={i} className="px-1.5 py-0.5 bg-slate-700 rounded text-[10px]">{t}</span>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const LoveKlineChart: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  // Prep data for Recharts range bar
  const chartData = data.map(d => ({
    ...d,
    wickRange: [d.low, d.high] // Used to drive the main bar height
  }));

  return (
    <div className="w-full h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-200">{t.loveKlineTitle}</h3>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 bg-love-up rounded-full"></div> {t.upStrong}</span>
          <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 bg-love-down rounded-full"></div> {t.downCool}</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="gregorianYear" 
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          {/* We use Bar with array dataKey to create the canvas for our custom shape */}
          <Bar 
            dataKey="wickRange" 
            shape={<Candlestick />} 
            barSize={12} 
            isAnimationActive={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};