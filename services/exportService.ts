import { AnalysisResult } from '../types';

export const downloadJSON = (data: AnalysisResult) => {
  const filename = `k-line-${data.inputEcho.personA.name}-${data.inputEcho.personB.name}-${new Date().toISOString().split('T')[0]}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  triggerDownload(blob, filename);
};

export const downloadMarkdown = (data: AnalysisResult) => {
  const filename = `k-line-report-${data.inputEcho.personA.name}-${data.inputEcho.personB.name}.md`;
  let content = '';

  // --- HEADER ---
  content += `# Relationship Analysis: ${data.inputEcho.personA.name} & ${data.inputEcho.personB.name}\n\n`;
  content += `> **Date Generated:** ${new Date(data.meta.generatedAt).toLocaleString()}\n`;
  content += `> **Timeline:** ${data.inputEcho.range.startYear} - ${data.inputEcho.range.endYear}\n\n`;

  // --- BAZI PROFILE ---
  content += `## 1. BaZi Profile (八字命盘)\n\n`;
  
  const pA = data.inputEcho.personA;
  content += `### ${pA.name} (${pA.gender})\n`;
  if (pA.bazi) {
    content += `| Pillar | GanZhi (Stem/Branch) |\n`;
    content += `|--------|----------------------|\n`;
    content += `| Year   | ${pA.bazi.yearPillar} |\n`;
    content += `| Month  | ${pA.bazi.monthPillar} |\n`;
    content += `| Day    | ${pA.bazi.dayPillar} |\n`;
    content += `| Hour   | ${pA.bazi.hourPillar} |\n\n`;
    if ((pA.bazi as any).dayMasterElement) content += `- **Day Master**: ${(pA.bazi as any).dayMasterElement}\n\n`;
  }

  const pB = data.inputEcho.personB;
  content += `### ${pB.name} (${pB.gender})\n`;
  if (pB.bazi) {
    content += `| Pillar | GanZhi (Stem/Branch) |\n`;
    content += `|--------|----------------------|\n`;
    content += `| Year   | ${pB.bazi.yearPillar} |\n`;
    content += `| Month  | ${pB.bazi.monthPillar} |\n`;
    content += `| Day    | ${pB.bazi.dayPillar} |\n`;
    content += `| Hour   | ${pB.bazi.hourPillar} |\n\n`;
    if ((pB.bazi as any).dayMasterElement) content += `- **Day Master**: ${(pB.bazi as any).dayMasterElement}\n\n`;
  }

  // --- OVERALL SUMMARY ---
  content += `## 2. Cosmic Verdict (星盘裁决)\n\n`;
  content += `${data.overall.summary}\n\n`;
  content += `- **Overall Synergy Score**: ${data.overall.summaryScore}/100\n`;
  content += `- **Golden Years**: ${data.overall.bestYears.join(', ')}\n`;
  content += `- **Challenging Years**: ${data.overall.riskYears.join(', ')}\n\n`;

  content += `### Compatibility Dimensions\n`;
  Object.entries(data.overall.dimensions).forEach(([key, val]) => {
     // Capitalize first letter
     const label = key.charAt(0).toUpperCase() + key.slice(1);
     content += `- **${label}**: ${val.score}/10 - ${val.comment}\n`;
  });
  content += `\n`;

  // --- YEARLY TIMELINE ---
  content += `## 3. Yearly Timeline (Love K-Line Analysis)\n\n`;
  
  data.page1LoveKline.series.forEach(year => {
    content += `### ${year.gregorianYear} ${year.ganZhiYear} (Year of the ${getZodiac(year.ganZhiYear)})\n`;
    content += `- **Score**: ${year.close}/100 (${year.trend})\n`;
    content += `- **Range**: Low ${year.low} - High ${year.high}\n`;
    content += `- **Analysis**: ${year.reason}\n`;
    if (year.tags && year.tags.length > 0) {
      content += `- **Key Themes**: ${year.tags.join(', ')}\n`;
    }
    content += `\n---\n\n`;
  });

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  triggerDownload(blob, filename);
};

// Helper to extract Zodiac animal from GanZhi string if possible, or just ignore
const getZodiac = (ganZhi: string): string => {
  // Simple check for standard animals in Chinese characters
  const animals = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
  // This is a placeholder; implementing full zodiac extraction requires mapping branch char.
  // We'll leave it simple for now or rely on what's in the string.
  return "Zodiac"; 
};

const triggerDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};