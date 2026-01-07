export interface CityData {
  name: string;
  nameZh?: string;
  lat: number;
  lng: number;
  timezone: number; // UTC offset in hours
}

export interface RegionData {
  name: string;
  nameZh?: string;
  cities: CityData[];
}

export interface CountryData {
  name: string;
  nameZh?: string;
  regions: RegionData[];
}

export const WORLD_DATA: CountryData[] = [
  {
    name: "China",
    nameZh: "中国",
    regions: [
      {
        name: "Beijing", nameZh: "北京",
        cities: [{ name: "Beijing", nameZh: "北京", lat: 39.9042, lng: 116.4074, timezone: 8 }]
      },
      {
        name: "Shanghai", nameZh: "上海",
        cities: [{ name: "Shanghai", nameZh: "上海", lat: 31.2304, lng: 121.4737, timezone: 8 }]
      },
      {
        name: "Guangdong", nameZh: "广东",
        cities: [
          { name: "Guangzhou", nameZh: "广州", lat: 23.1291, lng: 113.2644, timezone: 8 },
          { name: "Shenzhen", nameZh: "深圳", lat: 22.5431, lng: 114.0579, timezone: 8 },
          { name: "Dongguan", nameZh: "东莞", lat: 23.0208, lng: 113.7518, timezone: 8 },
          { name: "Foshan", nameZh: "佛山", lat: 23.0215, lng: 113.1214, timezone: 8 }
        ]
      },
      {
        name: "Zhejiang", nameZh: "浙江",
        cities: [
          { name: "Hangzhou", nameZh: "杭州", lat: 30.2741, lng: 120.1551, timezone: 8 },
          { name: "Ningbo", nameZh: "宁波", lat: 29.8683, lng: 121.5440, timezone: 8 }
        ]
      },
      {
        name: "Jiangsu", nameZh: "江苏",
        cities: [
          { name: "Nanjing", nameZh: "南京", lat: 32.0603, lng: 118.7969, timezone: 8 },
          { name: "Suzhou", nameZh: "苏州", lat: 31.2989, lng: 120.5853, timezone: 8 }
        ]
      },
      {
        name: "Sichuan", nameZh: "四川",
        cities: [
          { name: "Chengdu", nameZh: "成都", lat: 30.5728, lng: 104.0668, timezone: 8 }
        ]
      },
      {
        name: "Hubei", nameZh: "湖北",
        cities: [
          { name: "Wuhan", nameZh: "武汉", lat: 30.5928, lng: 114.3055, timezone: 8 }
        ]
      },
      {
        name: "Shaanxi", nameZh: "陕西",
        cities: [
          { name: "Xi'an", nameZh: "西安", lat: 34.3416, lng: 108.9398, timezone: 8 }
        ]
      },
      {
        name: "Chongqing", nameZh: "重庆",
        cities: [
          { name: "Chongqing", nameZh: "重庆", lat: 29.4316, lng: 106.9123, timezone: 8 }
        ]
      },
      {
        name: "Tianjin", nameZh: "天津",
        cities: [
          { name: "Tianjin", nameZh: "天津", lat: 39.0842, lng: 117.2009, timezone: 8 }
        ]
      },
      {
        name: "Hong Kong", nameZh: "香港",
        cities: [{ name: "Hong Kong", nameZh: "香港", lat: 22.3193, lng: 114.1694, timezone: 8 }]
      },
      {
        name: "Taiwan", nameZh: "台湾",
        cities: [
            { name: "Taipei", nameZh: "台北", lat: 25.0320, lng: 121.5654, timezone: 8 },
            { name: "Kaohsiung", nameZh: "高雄", lat: 22.6273, lng: 120.3014, timezone: 8 }
        ]
      }
    ]
  },
  {
    name: "USA", nameZh: "美国",
    regions: [
      {
        name: "California", nameZh: "加利福尼亚",
        cities: [
          { name: "Los Angeles", nameZh: "洛杉矶", lat: 34.0522, lng: -118.2437, timezone: -8 },
          { name: "San Francisco", nameZh: "旧金山", lat: 37.7749, lng: -122.4194, timezone: -8 },
          { name: "San Diego", nameZh: "圣地亚哥", lat: 32.7157, lng: -117.1611, timezone: -8 },
          { name: "San Jose", nameZh: "圣荷西", lat: 37.3382, lng: -121.8863, timezone: -8 }
        ]
      },
      {
        name: "New York", nameZh: "纽约州",
        cities: [
          { name: "New York City", nameZh: "纽约市", lat: 40.7128, lng: -74.0060, timezone: -5 },
          { name: "Buffalo", nameZh: "布法罗", lat: 42.8864, lng: -78.8784, timezone: -5 }
        ]
      },
      {
        name: "Texas", nameZh: "德克萨斯",
        cities: [
          { name: "Houston", nameZh: "休斯顿", lat: 29.7604, lng: -95.3698, timezone: -6 },
          { name: "Dallas", nameZh: "达拉斯", lat: 32.7767, lng: -96.7970, timezone: -6 },
          { name: "Austin", nameZh: "奥斯汀", lat: 30.2672, lng: -97.7431, timezone: -6 }
        ]
      },
      {
        name: "Washington", nameZh: "华盛顿州",
        cities: [
          { name: "Seattle", nameZh: "西雅图", lat: 47.6062, lng: -122.3321, timezone: -8 }
        ]
      },
      {
        name: "Illinois", nameZh: "伊利诺伊",
        cities: [
          { name: "Chicago", nameZh: "芝加哥", lat: 41.8781, lng: -87.6298, timezone: -6 }
        ]
      },
      {
        name: "Florida", nameZh: "佛罗里达",
        cities: [
          { name: "Miami", nameZh: "迈阿密", lat: 25.7617, lng: -80.1918, timezone: -5 },
          { name: "Orlando", nameZh: "奥兰多", lat: 28.5383, lng: -81.3792, timezone: -5 }
        ]
      },
      {
        name: "Massachusetts", nameZh: "马萨诸塞",
        cities: [
          { name: "Boston", nameZh: "波士顿", lat: 42.3601, lng: -71.0589, timezone: -5 }
        ]
      }
    ]
  },
  {
    name: "Canada", nameZh: "加拿大",
    regions: [
      {
        name: "Ontario", nameZh: "安大略",
        cities: [
          { name: "Toronto", nameZh: "多伦多", lat: 43.6510, lng: -79.3470, timezone: -5 },
          { name: "Ottawa", nameZh: "渥太华", lat: 45.4215, lng: -75.6972, timezone: -5 }
        ]
      },
      {
        name: "British Columbia", nameZh: "不列颠哥伦比亚",
        cities: [
          { name: "Vancouver", nameZh: "温哥华", lat: 49.2827, lng: -123.1207, timezone: -8 },
          { name: "Victoria", nameZh: "维多利亚", lat: 48.4284, lng: -123.3656, timezone: -8 }
        ]
      },
      {
        name: "Quebec", nameZh: "魁北克",
        cities: [
          { name: "Montreal", nameZh: "蒙特利尔", lat: 45.5017, lng: -73.5673, timezone: -5 },
          { name: "Quebec City", nameZh: "魁北克城", lat: 46.8139, lng: -71.2080, timezone: -5 }
        ]
      },
      {
        name: "Alberta", nameZh: "艾伯塔",
        cities: [
          { name: "Calgary", nameZh: "卡尔加里", lat: 51.0447, lng: -114.0719, timezone: -7 }
        ]
      }
    ]
  },
  {
    name: "United Kingdom", nameZh: "英国",
    regions: [
      {
        name: "England", nameZh: "英格兰",
        cities: [
          { name: "London", nameZh: "伦敦", lat: 51.5074, lng: -0.1278, timezone: 0 },
          { name: "Manchester", nameZh: "曼彻斯特", lat: 53.4808, lng: -2.2426, timezone: 0 },
          { name: "Birmingham", nameZh: "伯明翰", lat: 52.4862, lng: -1.8904, timezone: 0 }
        ]
      },
      {
        name: "Scotland", nameZh: "苏格兰",
        cities: [
          { name: "Edinburgh", nameZh: "爱丁堡", lat: 55.9533, lng: -3.1883, timezone: 0 },
          { name: "Glasgow", nameZh: "格拉斯哥", lat: 55.8642, lng: -4.2518, timezone: 0 }
        ]
      }
    ]
  },
  {
    name: "Australia", nameZh: "澳大利亚",
    regions: [
      {
        name: "New South Wales", nameZh: "新南威尔士",
        cities: [
          { name: "Sydney", nameZh: "悉尼", lat: -33.8688, lng: 151.2093, timezone: 10 }
        ]
      },
      {
        name: "Victoria", nameZh: "维多利亚",
        cities: [
          { name: "Melbourne", nameZh: "墨尔本", lat: -37.8136, lng: 144.9631, timezone: 10 }
        ]
      },
      {
        name: "Queensland", nameZh: "昆士兰",
        cities: [
          { name: "Brisbane", nameZh: "布里斯班", lat: -27.4698, lng: 153.0251, timezone: 10 }
        ]
      }
    ]
  },
  {
    name: "Japan", nameZh: "日本",
    regions: [
      {
        name: "Tokyo", nameZh: "东京",
        cities: [{ name: "Tokyo", nameZh: "东京", lat: 35.6762, lng: 139.6503, timezone: 9 }]
      },
      {
        name: "Osaka", nameZh: "大阪",
        cities: [{ name: "Osaka", nameZh: "大阪", lat: 34.6937, lng: 135.5023, timezone: 9 }]
      },
      {
        name: "Kyoto", nameZh: "京都",
        cities: [{ name: "Kyoto", nameZh: "京都", lat: 35.0116, lng: 135.7681, timezone: 9 }]
      }
    ]
  },
  {
    name: "Singapore", nameZh: "新加坡",
    regions: [
      {
        name: "Singapore", nameZh: "新加坡",
        cities: [{ name: "Singapore", nameZh: "新加坡", lat: 1.3521, lng: 103.8198, timezone: 8 }]
      }
    ]
  },
  {
    name: "Germany", nameZh: "德国",
    regions: [
      {
        name: "Berlin", nameZh: "柏林",
        cities: [{ name: "Berlin", nameZh: "柏林", lat: 52.5200, lng: 13.4050, timezone: 1 }]
      },
      {
        name: "Bavaria", nameZh: "巴伐利亚",
        cities: [{ name: "Munich", nameZh: "慕尼黑", lat: 48.1351, lng: 11.5820, timezone: 1 }]
      },
      {
        name: "Hesse", nameZh: "黑森",
        cities: [{ name: "Frankfurt", nameZh: "法兰克福", lat: 50.1109, lng: 8.6821, timezone: 1 }]
      }
    ]
  },
  {
    name: "France", nameZh: "法国",
    regions: [
      {
        name: "Île-de-France", nameZh: "法兰西岛",
        cities: [{ name: "Paris", nameZh: "巴黎", lat: 48.8566, lng: 2.3522, timezone: 1 }]
      },
      {
        name: "Provence-Alpes-Côte d'Azur", nameZh: "普罗旺斯",
        cities: [
            { name: "Marseille", nameZh: "马赛", lat: 43.2965, lng: 5.3698, timezone: 1 },
            { name: "Nice", nameZh: "尼斯", lat: 43.7102, lng: 7.2620, timezone: 1 }
        ]
      }
    ]
  }
];

export const getCountries = (lang: 'en' | 'zh' = 'en') => {
  return WORLD_DATA.map(c => ({
      value: c.name,
      label: lang === 'zh' ? (c.nameZh || c.name) : c.name
  }));
};

export const getRegions = (countryName: string, lang: 'en' | 'zh' = 'en') => {
  const country = WORLD_DATA.find(c => c.name === countryName);
  return country ? country.regions.map(r => ({
      value: r.name,
      label: lang === 'zh' ? (r.nameZh || r.name) : r.name,
      raw: r
  })) : [];
};

export const getCities = (countryName: string, regionName: string, lang: 'en' | 'zh' = 'en') => {
  const country = WORLD_DATA.find(c => c.name === countryName);
  if (!country) return [];
  const region = country.regions.find(r => r.name === regionName);
  return region ? region.cities.map(c => ({
      value: c.name,
      label: lang === 'zh' ? (c.nameZh || c.name) : c.name,
      raw: c
  })) : [];
};