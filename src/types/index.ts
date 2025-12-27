// src/types/index.ts

export interface UserProfile {
  name: string;
  gender: 'male' | 'female';
  birthDate: string;
  birthTime: string;
}

export interface BaziResult {
  pillars: string[]; // [年, 月, 日, 时]
  startAge: number;
  firstDaYun: string;
  daYunDirection: string;
  genderStr: string;
  // 【关键修复】新增这个字段，存放 100 年的大运表
  daYunList: { startAge: number; ganZhi: string }[]; 
}

// 恋爱 K 线的数据结构
export interface LoveKLinePoint {
  age: number;
  open: number;
  close: number;
  high: number;
  low: number;
  reason: string;
}

// 个人人生 K 线详批数据结构
export interface LifeChartPoint {
  age: number;
  year: number;
  daYun: string;
  ganZhi: string;
  open: number;
  close: number;
  high: number;
  low: number;
  score: number;
  reason: string;
}

// 单人详细命理报告结构
export interface LifeAnalysisResult {
  bazi: string[];
  chartPoints: LifeChartPoint[];
}

// API 总返回结构
export interface AiResponseData {
  loveSummary: string;
  loveScore: number;
  loveChartPoints: LoveKLinePoint[];
  reportA: LifeAnalysisResult;
  reportB: LifeAnalysisResult;
}