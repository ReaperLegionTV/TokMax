import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TikTokAnalysis } from "../types";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    viralHooks: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5 catchy, click-worthy text overlays or opening lines to hook viewers instantly.",
    },
    caption: {
      type: Type.STRING,
      description: "A highly engaging caption optimized for comments and shares. Include emojis.",
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "10 trending and niche-specific hashtags. Do not include the # symbol in the string, just the word.",
    },
    seoKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5-7 strategic keywords for TikTok SEO to help the video rank in search.",
    },
    viralityScore: {
      type: Type.INTEGER,
      description: "A predicted score from 0 to 100 indicating potential for going viral based on current trends.",
    },
    improvementTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 actionable, specific tips to improve the video's performance (e.g., lighting, pacing, sound).",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief 1-sentence explanation of why this strategy works.",
    },
  },
  required: ["viralHooks", "caption", "hashtags", "seoKeywords", "viralityScore", "improvementTips", "explanation"],
};

export const analyzeTikTokConcept = async (
  textDescription: string,
  imageBase64?: string,
  mimeType?: string
): Promise<TikTokAnalysis> => {
  const ai = getClient();

  const parts: any[] = [];

  if (imageBase64 && mimeType) {
    parts.push({
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    });
  }

  const promptText = `
    Analyze this TikTok video concept/content.
    
    Context: ${textDescription || "A generic TikTok video"}
    
    Provide a comprehensive optimization strategy.
  `;
  
  parts.push({ text: promptText });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7, // Creative but relevant
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(responseText) as TikTokAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};
