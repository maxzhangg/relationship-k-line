export type Language = 'en' | 'zh';

export const translations = {
  en: {
    appTitle: "Relationship K-Line",
    appSubtitle: "AI Astrology Analytics",
    heroTitle: "Discover Your Timeline",
    heroDesc: "Enter birth details to generate a Love K-Line and Life Trajectory analysis powered by advanced BaZi calculations and AI reasoning.",
    loading: "Calculating Celestial Mechanics...",
    errorGeneric: "An unknown error occurred.",
    startNew: "Start New Analysis",
    
    // Import
    haveData: "Already have data?",
    importLink: "Import JSON",
    importTitle: "Import Analysis Data",
    importDesc: "Upload a previously generated 'relationship-k-line' JSON file to restore your analysis.",
    dropFile: "Drop JSON file here or click to upload",
    invalidFile: "Invalid file format. Please upload a valid JSON.",
    importSuccess: "Data loaded successfully!",
    backHome: "Back to Home",

    // Export
    export: "Export",
    saveJson: "Save Data (JSON)",
    saveReport: "Save Report (MD)",

    // Form
    personA: "Person A",
    personB: "Person B",
    name: "Name",
    gender: "Gender",
    male: "Male",
    female: "Female",
    date: "Date",
    time: "Time",
    country: "Country",
    region: "Region",
    city: "City",
    zone: "Zone",
    startYear: "Start Year",
    duration: "Duration (Years)",
    years: "Years",
    apiKey: "Google Gemini API Key",
    pricing: "Pricing Info",
    getKey: "Get Key",
    tip: "Tip: If you see 'Resource Exhausted' errors, your free key is rate-limited. Link your Google Cloud billing account in AI Studio to enable Pay-as-you-go.",
    submit: "Generate Cosmic Analysis",
    submitting: "Consulting the Stars...",
    
    // Summary
    cosmicVerdict: "Cosmic Verdict",
    goldenYears: "Golden Years",
    challengingYears: "Challenging Years",
    baziBlueprint: "BaZi Blueprint",
    compDimensions: "Compatibility Dimensions",
    overallSynergy: "Overall Synergy",
    
    // Dimensions keys (must match keys in types.ts/Overall.dimensions roughly or be mapped)
    dim_communication: "Communication",
    dim_values: "Values",
    dim_intimacy: "Intimacy",
    dim_stability: "Stability",
    dim_family: "Family",
    dim_career: "Career",
    dim_wealth: "Wealth",

    // Charts
    loveKlineTitle: "Love K-Line Analysis",
    lifeLineTitle: "Life Trajectory Comparison",
    upStrong: "Up/Strong",
    downCool: "Down/Cool",
    jointEvent: "Joint Event",
    personalEvent: "Personal Event",
    score: "Score",
    high: "High",
    low: "Low"
  },
  zh: {
    appTitle: "姻缘 K 线图",
    appSubtitle: "AI 命理分析",
    heroTitle: "探索你们的时间线",
    heroDesc: "输入出生信息，基于八字算法和 AI 推理，生成“姻缘 K 线”和“人生轨迹”深度分析。",
    loading: "正在演算天机...",
    errorGeneric: "发生了未知错误。",
    startNew: "开始新的分析",
    
    // Import
    haveData: "已经有数据？",
    importLink: "导入数据",
    importTitle: "导入分析数据",
    importDesc: "上传之前保存的 JSON 文件以还原分析结果。",
    dropFile: "将 JSON 文件拖到此处，或点击上传",
    invalidFile: "文件格式无效，请上传正确的 JSON 文件。",
    importSuccess: "数据读取成功！",
    backHome: "返回首页",

    // Export
    export: "保存结果",
    saveJson: "下载数据 (JSON)",
    saveReport: "下载报告 (MD)",

    // Form
    personA: "甲方 (Person A)",
    personB: "乙方 (Person B)",
    name: "姓名",
    gender: "性别",
    male: "男",
    female: "女",
    date: "日期",
    time: "时间",
    country: "国家/地区",
    region: "省/州",
    city: "城市",
    zone: "时区",
    startYear: "开始年份",
    duration: "预测时长",
    years: "年",
    apiKey: "Google Gemini API Key",
    pricing: "价格信息",
    getKey: "获取 Key",
    tip: "提示：如果遇到 'Resource Exhausted' 错误，说明免费 Key 达到了速率限制。建议在 AI Studio 中绑定结算账户以启用按量付费模式。",
    submit: "生成命理分析",
    submitting: "正在咨询星辰...",
    
    // Summary
    cosmicVerdict: "星盘裁决",
    goldenYears: "黄金年份",
    challengingYears: "挑战年份",
    baziBlueprint: "八字蓝图",
    compDimensions: "维度分析",
    overallSynergy: "综合契合度",
    
    // Dimensions
    dim_communication: "沟通",
    dim_values: "价值观",
    dim_intimacy: "亲密关系",
    dim_stability: "稳定性",
    dim_family: "家庭",
    dim_career: "事业",
    dim_wealth: "财富",

    // Charts
    loveKlineTitle: "姻缘 K 线分析",
    lifeLineTitle: "人生轨迹对比",
    upStrong: "升温/强势",
    downCool: "降温/冷静",
    jointEvent: "共同事件",
    personalEvent: "个人事件",
    score: "分数",
    high: "高点",
    low: "低点"
  }
};