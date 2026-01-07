import { Solar } from 'lunar-javascript';
import { Bazi, BirthDetails } from '../types';

const HEAVENLY_STEMS: Record<string, string> = {
  '甲': 'Jia', '乙': 'Yi', '丙': 'Bing', '丁': 'Ding', '戊': 'Wu',
  '己': 'Ji', '庚': 'Geng', '辛': 'Xin', '壬': 'Ren', '癸': 'Gui'
};

const EARTHLY_BRANCHES: Record<string, string> = {
  '子': 'Zi', '丑': 'Chou', '寅': 'Yin', '卯': 'Mao', '辰': 'Chen', '巳': 'Si',
  '午': 'Wu', '未': 'Wei', '申': 'Shen', '酉': 'You', '戌': 'Xu', '亥': 'Hai'
};

const ELEMENTS: Record<string, string> = {
  '甲': 'Yang Wood', '乙': 'Yin Wood', '丙': 'Yang Fire', '丁': 'Yin Fire',
  '戊': 'Yang Earth', '己': 'Yin Earth', '庚': 'Yang Metal', '辛': 'Yin Metal',
  '壬': 'Yang Water', '癸': 'Yin Water'
};

function formatPillar(char: string): string {
  if (!char || char.length < 2) return char;
  const stem = char.charAt(0);
  const branch = char.charAt(1);
  const stemPinyin = HEAVENLY_STEMS[stem] || '';
  const branchPinyin = EARTHLY_BRANCHES[branch] || '';
  return `${stemPinyin}${branchPinyin} ${char}`;
}

// True Solar Time Calculation
function getTrueSolarTime(date: Date, lng: number, timezoneOffset: number): Date {
  // 1. Calculate Day of Year (N)
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 2. Equation of Time (Approximate formula)
  // B = 360 * (N - 81) / 365
  const B = (360 * (dayOfYear - 81)) / 365;
  const bRad = (B * Math.PI) / 180;
  
  // EoT in minutes = 9.87 * sin(2B) - 7.53 * cos(B) - 1.5 * sin(B)
  const eot = 9.87 * Math.sin(2 * bRad) - 7.53 * Math.cos(bRad) - 1.5 * Math.sin(bRad);

  // 3. Longitude Correction
  // Standard meridian for timezone: 15 degrees per hour
  const stdMeridian = timezoneOffset * 15;
  const longCorrection = (lng - stdMeridian) * 4; // 4 minutes per degree

  // 4. Total offset in minutes
  const totalOffsetMinutes = longCorrection + eot;
  
  // 5. Apply to date
  const adjustedTime = new Date(date.getTime() + totalOffsetMinutes * 60000);
  
  return adjustedTime;
}

export const calculateBazi = (birth: BirthDetails): Bazi => {
  try {
    // Parse date and time
    const [year, month, day] = birth.date.split('-').map(Number);
    const [hour, minute] = birth.time.split(':').map(Number);
    
    // Construct local Date object (assuming the input is local standard time)
    const localDate = new Date(year, month - 1, day, hour, minute, 0);

    // If coordinates are available, calculate True Solar Time
    let solarObj: Solar;

    if (birth.lon !== undefined && birth.timezoneOffset !== undefined) {
       const trueSolarTime = getTrueSolarTime(localDate, birth.lon, birth.timezoneOffset);
       // Use the adjusted time to create the Solar object
       solarObj = Solar.fromYmdHms(
         trueSolarTime.getFullYear(),
         trueSolarTime.getMonth() + 1,
         trueSolarTime.getDate(),
         trueSolarTime.getHours(),
         trueSolarTime.getMinutes(),
         trueSolarTime.getSeconds()
       );
    } else {
       // Fallback to standard time if no geo info (shouldn't happen with new UI)
       solarObj = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    }
    
    // Convert to Lunar to get Eight Char
    const lunar = solarObj.getLunar();
    const eightChar = lunar.getEightChar();
    
    // lunar-javascript automatically handles the JieQi (Solar Terms) for Year and Month pillars.
    // By passing True Solar Time into Solar.fromYmdHms, the 'hour' pillar (ShiChen) will be accurate.
    
    const yearPillar = eightChar.getYear();
    const monthPillar = eightChar.getMonth();
    const dayPillar = eightChar.getDay();
    const hourPillar = eightChar.getTime();
    
    const dayStem = dayPillar.charAt(0);
    const dayMasterElement = ELEMENTS[dayStem] || '';

    return {
        yearPillar: formatPillar(yearPillar),
        monthPillar: formatPillar(monthPillar),
        dayPillar: formatPillar(dayPillar),
        hourPillar: formatPillar(hourPillar),
        dayMasterElement
    };
  } catch (e) {
    console.error("BaZi Calculation Error:", e);
    // Fallback
    return {
        yearPillar: "Unknown",
        monthPillar: "Unknown",
        dayPillar: "Unknown",
        hourPillar: "Unknown",
        dayMasterElement: "Unknown"
    };
  }
};
