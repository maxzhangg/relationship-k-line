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

interface Props {
  data: LoveKlinePoint[];
}

// Custom Shape for the Candlestick
const Candlestick = (props: any) => {
  const { x, y, width, height, low, high, open, close } = props;
  
  const isUp = close > open;
  // Colors: Up is Red (East Asian convention for good/up), Down is Green.
  // Or Western: Up is Green, Down is Red.
  // Prompt implies "Love K-Line", traditionally Red is 'hot/passion'. Let's stick to Red = Up/Improvement.
  const stroke = isUp ? '#f87171' : '#4ade80'; 
  const fill = isUp ? '#ef4444' : '#22c55e';

  // Y-axis in Recharts is inverted (0 is top). 
  // We need to map the values to pixels. 
  // However, the `props` passed to shape in Bar are already scaled coordinates for the BAR part (Open/Close).
  // We need to manually calculate the High/Low pixel positions relative to the Bar's known scaling.
  // But Recharts custom shapes inside <Bar> receive the data object.
  // We can't easily get the scale function here. 
  
  // Alternative strategy:
  // The `Bar` component handles the body (Open -> Close).
  // We just need to draw the wicks (Low -> High) and ensure the body is colored correctly.
  
  // Actually, standard trick: 
  // <Bar dataKey="body" /> where body is [min(open,close), max(open,close)] (range bar)
  // Recharts Bar doesn't support range array [min, max] out of the box easily without 'recharts' recent versions or tricks.
  
  // Easier approach with Recharts ComposedChart:
  // We pass a custom shape that draws EVERYTHING (Wick + Body) based on the payload.
  // But we need the Y-Scale. 
  
  // Let's use the provided x, y, width, height from Recharts which corresponds to the `dataKey` value.
  // If we set dataKey="high", the bar goes from 0 to High. Not what we want.
  
  // Robust Solution:
  // Use `ErrorBar` for wicks? Hard to style.
  // Let's interpret `y` and `height`.
  // To do this properly in Recharts without a headache, we assume the Y axis domain is set.
  // We need to access the `yAxis` scale.
  
  // Workaround:
  // We will pass the pre-calculated pixel values if possible? No.
  
  // We will use a simplified visual: 
  // 1. A floating Bar for the body (using a dataKey that represents the TOP of the body, and a custom shape that reads the BOTTOM from payload).
  //    Wait, Recharts <Bar> starts from 0 (or baseline).
  
  // BEST APPROACH for custom candle in Recharts:
  // Make the chart value the `high` value.
  // In the CustomShape, use the `payload` (which contains open, close, low, high) and the `yAxis` scale context? 
  // No, context isn't passed to shape.
  
  // Okay, we will use the `Bar` to represent the range [min(open, close), max(open, close)]. 
  // Recharts <Bar> accepts `dataKey` as an array [min, max] in newer versions!
  // Let's assume standard Recharts. 
  
  // Fallback to "Scatter" with Error Bars? No, ugly.
  
  // Let's use the standard SVG drawing within the `Bar` shape.
  // We need to hack the height.
  // If we assume the chart has a fixed domain, we can try to calculate. 
  // But responsive is hard.
  
  // LET'S TRY: <Bar dataKey="maxBody" shape={<CandleShape />} />
  // We need to map values to pixels. 
  // Since we can't easily get the scale in the shape, we might struggle.
  
  // Alternative: Use a library wrapper? No, native code.
  
  // PLAN B: Construct a "floating column" logic.
  // 1. Invisible Bar for `low`.
  // 2. Bar for `(high - low)`? No.
  
  // PLAN C (The winner):
  // We use `ComposedChart`.
  // We add a `<Bar dataKey="candleRange" shape={...} />`
  // We calculate `candleRange` as `[min(open,close), max(open,close)]`.
  // Recharts supports range bars if we format data right. 
  // If `dataKey` returns an array, it draws a floating bar.
  
  // Data preparation happens in the component.
  
  const { payload, yAxis } = props; 
  // yAxis is typically injected if we use CustomComponent in the right slot, but often not in shape.
  // Actually, if we use a specific trick:
  // We bind the Y-axis scale to the shape?
  
  // Simpler Visual: 
  // Draw a Line for High-Low (using ErrorBar logic manually?)
  // Draw a Rectangle for Open-Close.
  
  // Let's just use the `Rectangle` primitive from Recharts and calculate coords relative to the provided `y` (top) and `height`.
  // But `y` depends on the value passed to `dataKey`.
  
  // Let's use the provided `y` as the `max(open, close)` pixel position (Top of body).
  // The `height` is the body height.
  // We just need to figure out where High and Low are.
  // We can approximate or use the unit scale `height / (maxBody - minBody)`.
  
  const openVal = payload.open;
  const closeVal = payload.close;
  const highVal = payload.high;
  const lowVal = payload.low;
  
  const bodyTop = Math.max(openVal, closeVal);
  const bodyBottom = Math.min(openVal, closeVal);
  const bodyLen = bodyTop - bodyBottom;
  
  // Safe division
  const pixelsPerUnit = bodyLen === 0 ? 0 : height / bodyLen;
  
  // If pixelsPerUnit is 0 (doji), we need a default or fallback using high-low?
  // If body is flat, height is 0. 
  
  // Let's accept a slight imperfection: If body is 0, we can't infer scale easily from just the bar rect.
  // BUT, we can assume the data passed to this Bar is `[low, high]`.
  // Then the Bar covers the whole wick. 
  // Then we draw the Body as a rect INSIDE that wick-bar.
  
  // Strategy: 
  // `dataKey` = `[low, high]`.
  // The Bar `props` (x, y, width, height) now represent the Full Wick dimensions.
  // We draw a line down the middle (The Wick).
  // We draw a rect for the Body based on `open` and `close` relative to `low` (bottom of bar) and `high` (top of bar).
  
  const range = highVal - lowVal;
  const unitH = range === 0 ? 0 : height / range;
  
  // Distance from Top of Bar (High) to Top of Body (Max(Open,Close))
  const topOffset = (highVal - Math.max(openVal, closeVal)) * unitH;
  // Body Height
  const bodyHeight = Math.abs(openVal - closeVal) * unitH;
  
  const isDoji = bodyHeight < 2;
  const finalBodyHeight = isDoji ? 2 : bodyHeight; // Min height for visibility
  
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
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-xl text-xs text-slate-200">
        <p className="font-bold text-sm mb-1">{data.gregorianYear} ({data.ganZhiYear})</p>
        <p className="text-slate-400">Score: {data.close}</p>
        <p className="text-emerald-400">High: {data.high}</p>
        <p className="text-rose-400">Low: {data.low}</p>
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
  // Prep data for Recharts range bar
  const chartData = data.map(d => ({
    ...d,
    wickRange: [d.low, d.high] // Used to drive the main bar height
  }));

  return (
    <div className="w-full h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Love K-Line Analysis</h3>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 bg-love-up rounded-full"></div> Up/Strong</span>
          <span className="flex items-center gap-1 text-slate-400"><div className="w-2 h-2 bg-love-down rounded-full"></div> Down/Cool</span>
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