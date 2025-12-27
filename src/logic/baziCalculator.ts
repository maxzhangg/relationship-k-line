// src/logic/baziCalculator.ts
import { Solar, Lunar } from 'lunar-javascript';
import { UserProfile, BaziResult } from '../types';

export function calculateBazi(profile: UserProfile): BaziResult {
  const [year, month, day] = profile.birthDate.split('-').map(Number);
  const [hour, minute] = profile.birthTime.split(':').map(Number);

  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = Lunar.fromSolar(solar);
  const eightChar = lunar.getEightChar();
  
  // 1: 男, 0: 女
  const genderNum = profile.gender === 'male' ? 1 : 0;
  
  // 1. 获取四柱
  const pillars = [
    eightChar.getYear(),
    eightChar.getMonth(),
    eightChar.getDay(),
    eightChar.getTime()
  ];

  // 2. 获取运势对象
  const yun = eightChar.getYun(genderNum);
  
  // 3. 获取大运数组
  // getDaYun() 默认获取大运列表，我们取前 12 步 (覆盖 120 年) 以确保够用
  const fullDaYunArray = yun.getDaYun(); 
  
  let startAge = 1;
  let firstDaYun = '未知';

  if (fullDaYunArray && fullDaYunArray.length > 0) {
    startAge = fullDaYunArray[0].getStartAge();
    firstDaYun = fullDaYunArray[0].getGanZhi();
  }

  // 4. 【关键修复】生成简化的大运列表供 Prompt 使用
  // 提取每一大运的 [起运岁数, 干支]
  const daYunList = fullDaYunArray.slice(0, 12).map(dy => ({
    startAge: dy.getStartAge(),
    ganZhi: dy.getGanZhi()
  }));

  const direction = yun.isForward() ? '顺' : '逆'; 

  return {
    pillars,
    startAge,
    firstDaYun,
    daYunDirection: direction,
    genderStr: profile.gender === 'male' ? '男' : '女',
    daYunList // <--- 现在这里有值了
  };
}