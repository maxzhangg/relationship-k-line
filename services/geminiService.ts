import { GoogleGenAI } from "@google/genai";
import { PersonInput, AnalysisResult } from '../types';
import { SYSTEM_PROMPT } from './promptTemplate';
import { calculateBazi } from './baziCalculator';

// Helper function to pause execution
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateAstrologyData = async (
  personA: PersonInput,
  personB: PersonInput,
  startYear: number,
  endYear: number,
  apiKey: string,
  language: 'en' | 'zh' // Add language parameter
): Promise<AnalysisResult> => {

  const ai = new GoogleGenAI({ apiKey });

  // Generate explicit list of years to force the model to output every single one
  const requiredYears = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // PRE-CALCULATE BAZI IN FRONTEND
  // We pass the full birth object (including lat/lon/timezone) to the calculator
  const baziA = calculateBazi(personA.birth);
  const baziB = calculateBazi(personB.birth);

  const inputJson = {
    uiLanguage: language, // Pass language to context
    range: { 
      startYear, 
      endYear,
      requiredOutputYears: requiredYears 
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    personA: {
      ...personA,
      bazi: baziA // Pass calculated BaZi
    },
    personB: {
      ...personB,
      bazi: baziB // Pass calculated BaZi
    }
  };

  const fullPrompt = `
${SYSTEM_PROMPT}

====================================================
LANGUAGE INSTRUCTION
====================================================
You MUST output all natural language text (summaries, reasons, comments, event titles, details) in ${language === 'zh' ? 'SIMPLIFIED CHINESE (简体中文)' : 'ENGLISH'}.

====================================================
USER INPUT DATA
====================================================
IMPORTANT: 
1. The BaZi (Four Pillars) have already been calculated and provided in the input JSON below. USE THEM.
2. You must generate a data point for EVERY year listed in 'requiredOutputYears'.
3. You MUST use the names "${personA.name}" and "${personB.name}" in all your analysis text. Do NOT use "Person A" or "Person B".

${JSON.stringify(inputJson, null, 2)}
`;

  // Retry Logic Configuration
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', 
        contents: fullPrompt,
        config: {
          responseMimeType: "application/json",
          // Optional: Enable thinking for complex BaZi calculations if needed, 
          // but strictly speaking the model decides. 
          // We leave thinkingBudget unset to let the model decide.
        }
      });

      const text = response.text;
      if (!text) throw new Error("No data returned from Gemini");

      // Clean up potential markdown code blocks
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(cleanText) as AnalysisResult;

    } catch (error: any) {
      console.warn(`Attempt ${attempt + 1} failed:`, error.message);
      
      // Check if it's a Rate Limit error (429) or Service Unavailable (503)
      const isRateLimit = error.message?.includes('429') || 
                          error.message?.includes('RESOURCE_EXHAUSTED') ||
                          error.status === 429;
      
      if (isRateLimit && attempt < MAX_RETRIES - 1) {
        attempt++;
        // Exponential Backoff: Wait 2s, then 4s, then 8s...
        const delay = 2000 * Math.pow(2, attempt);
        console.log(`Rate limit hit. Retrying in ${delay}ms...`);
        await wait(delay);
        continue; // Retry the loop
      }

      // If specific API key error
      if (error.message?.includes('401') || error.message?.includes('API key')) {
        throw new Error("Invalid API Key. Please check your key and try again.");
      }

      // If we ran out of retries or it's another error, throw it up
      if (isRateLimit) {
        throw new Error("Server is busy (Rate Limit Exceeded). Please wait 1 minute, or switch to a paid 'Pay-as-you-go' API key to avoid these limits.");
      }

      throw new Error(error.message || "Failed to generate astrology data.");
    }
  }

  throw new Error("Failed to connect to AI service after multiple attempts.");
};