import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LoveKLinePoint } from '../types';

interface Props {
  data: LoveKLinePoint[];
}

export const LoveKLineChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const dates = data.map(item => `${item.age}岁`);
  const values = data.map(item => [item.open, item.close, item.low, item.high]);
  
  // 计算颜色：收盘 > 开盘 = 阳(红)，反之阴(绿) - 遵循国内股市习惯，或根据喜好调整
  // 国际惯例：红跌绿涨；国内：红涨绿跌。这里用：红=好(涨)，绿=差(跌)
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '❤️ 恋爱趋势 K 线 (18-80岁)',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: (params: any) => {
        const idx = params[0].dataIndex;
        const item = data[idx];
        return `
          <b>${item.age}岁</b><br/>
          评语: ${item.reason}<br/>
          开盘: ${item.open} / 收盘: ${item.close}<br/>
          最高: ${item.high} / 最低: ${item.low}
        `;
      }
    },
    xAxis: {
      data: dates,
      axisLine: { lineStyle: { color: '#888' } }
    },
    yAxis: {
      scale: true,
      splitLine: { show: false },
      axisLine: { lineStyle: { color: '#888' } }
    },
    dataZoom: [{ type: 'inside', start: 0, end: 50 }, { show: true }],
    series: [
      {
        type: 'candlestick',
        data: values,
        itemStyle: {
          color: '#ef4444', // 阳线颜色 (Close > Open)
          color0: '#22c55e', // 阴线颜色 (Close < Open)
          borderColor: '#ef4444',
          borderColor0: '#22c55e'
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};