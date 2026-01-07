export interface CityData {
  name: string;
  lat: number;
  lng: number;
  timezone: number; // UTC offset in hours
}

export interface RegionData {
  name: string;
  cities: CityData[];
}

export interface CountryData {
  name: string;
  regions: RegionData[];
}

export const WORLD_DATA: CountryData[] = [
  {
    name: "China",
    regions: [
      {
        name: "Beijing",
        cities: [{ name: "Beijing", lat: 39.9042, lng: 116.4074, timezone: 8 }]
      },
      {
        name: "Shanghai",
        cities: [{ name: "Shanghai", lat: 31.2304, lng: 121.4737, timezone: 8 }]
      },
      {
        name: "Guangdong",
        cities: [
          { name: "Guangzhou", lat: 23.1291, lng: 113.2644, timezone: 8 },
          { name: "Shenzhen", lat: 22.5431, lng: 114.0579, timezone: 8 },
          { name: "Dongguan", lat: 23.0208, lng: 113.7518, timezone: 8 },
          { name: "Foshan", lat: 23.0215, lng: 113.1214, timezone: 8 }
        ]
      },
      {
        name: "Zhejiang",
        cities: [
          { name: "Hangzhou", lat: 30.2741, lng: 120.1551, timezone: 8 },
          { name: "Ningbo", lat: 29.8683, lng: 121.5440, timezone: 8 }
        ]
      },
      {
        name: "Jiangsu",
        cities: [
          { name: "Nanjing", lat: 32.0603, lng: 118.7969, timezone: 8 },
          { name: "Suzhou", lat: 31.2989, lng: 120.5853, timezone: 8 }
        ]
      },
      {
        name: "Sichuan",
        cities: [
          { name: "Chengdu", lat: 30.5728, lng: 104.0668, timezone: 8 }
        ]
      },
      {
        name: "Hubei",
        cities: [
          { name: "Wuhan", lat: 30.5928, lng: 114.3055, timezone: 8 }
        ]
      },
      {
        name: "Shaanxi",
        cities: [
          { name: "Xi'an", lat: 34.3416, lng: 108.9398, timezone: 8 }
        ]
      },
      {
        name: "Chongqing",
        cities: [
          { name: "Chongqing", lat: 29.4316, lng: 106.9123, timezone: 8 }
        ]
      },
      {
        name: "Tianjin",
        cities: [
          { name: "Tianjin", lat: 39.0842, lng: 117.2009, timezone: 8 }
        ]
      },
      {
        name: "Hong Kong",
        cities: [{ name: "Hong Kong", lat: 22.3193, lng: 114.1694, timezone: 8 }]
      },
      {
        name: "Taiwan",
        cities: [
            { name: "Taipei", lat: 25.0320, lng: 121.5654, timezone: 8 },
            { name: "Kaohsiung", lat: 22.6273, lng: 120.3014, timezone: 8 }
        ]
      }
    ]
  },
  {
    name: "USA",
    regions: [
      {
        name: "California",
        cities: [
          { name: "Los Angeles", lat: 34.0522, lng: -118.2437, timezone: -8 },
          { name: "San Francisco", lat: 37.7749, lng: -122.4194, timezone: -8 },
          { name: "San Diego", lat: 32.7157, lng: -117.1611, timezone: -8 },
          { name: "San Jose", lat: 37.3382, lng: -121.8863, timezone: -8 }
        ]
      },
      {
        name: "New York",
        cities: [
          { name: "New York City", lat: 40.7128, lng: -74.0060, timezone: -5 },
          { name: "Buffalo", lat: 42.8864, lng: -78.8784, timezone: -5 }
        ]
      },
      {
        name: "Texas",
        cities: [
          { name: "Houston", lat: 29.7604, lng: -95.3698, timezone: -6 },
          { name: "Dallas", lat: 32.7767, lng: -96.7970, timezone: -6 },
          { name: "Austin", lat: 30.2672, lng: -97.7431, timezone: -6 }
        ]
      },
      {
        name: "Washington",
        cities: [
          { name: "Seattle", lat: 47.6062, lng: -122.3321, timezone: -8 }
        ]
      },
      {
        name: "Illinois",
        cities: [
          { name: "Chicago", lat: 41.8781, lng: -87.6298, timezone: -6 }
        ]
      },
      {
        name: "Florida",
        cities: [
          { name: "Miami", lat: 25.7617, lng: -80.1918, timezone: -5 },
          { name: "Orlando", lat: 28.5383, lng: -81.3792, timezone: -5 }
        ]
      },
      {
        name: "Massachusetts",
        cities: [
          { name: "Boston", lat: 42.3601, lng: -71.0589, timezone: -5 }
        ]
      }
    ]
  },
  {
    name: "Canada",
    regions: [
      {
        name: "Ontario",
        cities: [
          { name: "Toronto", lat: 43.6510, lng: -79.3470, timezone: -5 },
          { name: "Ottawa", lat: 45.4215, lng: -75.6972, timezone: -5 }
        ]
      },
      {
        name: "British Columbia",
        cities: [
          { name: "Vancouver", lat: 49.2827, lng: -123.1207, timezone: -8 },
          { name: "Victoria", lat: 48.4284, lng: -123.3656, timezone: -8 }
        ]
      },
      {
        name: "Quebec",
        cities: [
          { name: "Montreal", lat: 45.5017, lng: -73.5673, timezone: -5 },
          { name: "Quebec City", lat: 46.8139, lng: -71.2080, timezone: -5 }
        ]
      },
      {
        name: "Alberta",
        cities: [
          { name: "Calgary", lat: 51.0447, lng: -114.0719, timezone: -7 }
        ]
      }
    ]
  },
  {
    name: "United Kingdom",
    regions: [
      {
        name: "England",
        cities: [
          { name: "London", lat: 51.5074, lng: -0.1278, timezone: 0 },
          { name: "Manchester", lat: 53.4808, lng: -2.2426, timezone: 0 },
          { name: "Birmingham", lat: 52.4862, lng: -1.8904, timezone: 0 }
        ]
      },
      {
        name: "Scotland",
        cities: [
          { name: "Edinburgh", lat: 55.9533, lng: -3.1883, timezone: 0 },
          { name: "Glasgow", lat: 55.8642, lng: -4.2518, timezone: 0 }
        ]
      }
    ]
  },
  {
    name: "Australia",
    regions: [
      {
        name: "New South Wales",
        cities: [
          { name: "Sydney", lat: -33.8688, lng: 151.2093, timezone: 10 }
        ]
      },
      {
        name: "Victoria",
        cities: [
          { name: "Melbourne", lat: -37.8136, lng: 144.9631, timezone: 10 }
        ]
      },
      {
        name: "Queensland",
        cities: [
          { name: "Brisbane", lat: -27.4698, lng: 153.0251, timezone: 10 }
        ]
      }
    ]
  },
  {
    name: "Japan",
    regions: [
      {
        name: "Tokyo",
        cities: [{ name: "Tokyo", lat: 35.6762, lng: 139.6503, timezone: 9 }]
      },
      {
        name: "Osaka",
        cities: [{ name: "Osaka", lat: 34.6937, lng: 135.5023, timezone: 9 }]
      },
      {
        name: "Kyoto",
        cities: [{ name: "Kyoto", lat: 35.0116, lng: 135.7681, timezone: 9 }]
      }
    ]
  },
  {
    name: "Singapore",
    regions: [
      {
        name: "Singapore",
        cities: [{ name: "Singapore", lat: 1.3521, lng: 103.8198, timezone: 8 }]
      }
    ]
  },
  {
    name: "Germany",
    regions: [
      {
        name: "Berlin",
        cities: [{ name: "Berlin", lat: 52.5200, lng: 13.4050, timezone: 1 }]
      },
      {
        name: "Bavaria",
        cities: [{ name: "Munich", lat: 48.1351, lng: 11.5820, timezone: 1 }]
      },
      {
        name: "Hesse",
        cities: [{ name: "Frankfurt", lat: 50.1109, lng: 8.6821, timezone: 1 }]
      }
    ]
  },
  {
    name: "France",
    regions: [
      {
        name: "Île-de-France",
        cities: [{ name: "Paris", lat: 48.8566, lng: 2.3522, timezone: 1 }]
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        cities: [
            { name: "Marseille", lat: 43.2965, lng: 5.3698, timezone: 1 },
            { name: "Nice", lat: 43.7102, lng: 7.2620, timezone: 1 }
        ]
      }
    ]
  }
];

export const getCountries = () => WORLD_DATA.map(c => c.name).sort();

export const getRegions = (countryName: string) => {
  const country = WORLD_DATA.find(c => c.name === countryName);
  return country ? country.regions : [];
};

export const getCities = (countryName: string, regionName: string) => {
  const country = WORLD_DATA.find(c => c.name === countryName);
  if (!country) return [];
  const region = country.regions.find(r => r.name === regionName);
  return region ? region.cities : [];
};
