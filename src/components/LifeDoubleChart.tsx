import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LifeScorePoint } from '../types';

interface Props {
  dataA: LifeScorePoint[];
  dataB: LifeScorePoint[];
  nameA: string;
  nameB: string;
}

export const LifeDoubleChart: React.FC<Props> = ({ dataA, dataB, nameA, nameB }) => {
  if (!dataA.length || !dataB.length) return null;

  const ages = dataA.map(d => d.age);
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '📈 双人人生运势对比',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' }
    },
    legend: {
      data: [nameA, nameB],
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ages.map(a => `${a}岁`),
      axisLine: { lineStyle: { color: '#888' } }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: { lineStyle: { color: '#333' } },
      axisLine: { lineStyle: { color: '#888' } }
    },
    series: [
      {
        name: nameA,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: dataA.map(d => d.score),
        lineStyle: { width: 3, color: '#60a5fa' }, // Blue
        areaStyle: { opacity: 0.1, color: '#60a5fa' }
      },
      {
        name: nameB,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: dataB.map(d => d.score),
        lineStyle: { width: 3, color: '#f472b6' }, // Pink
        areaStyle: { opacity: 0.1, color: '#f472b6' }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '350px', width: '100%' }} />;
};