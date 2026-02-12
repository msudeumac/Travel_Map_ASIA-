
import { GoogleGenAI } from "@google/genai";

export const getGeminiLocationStory = async (locationName: string, photoCount: number) => {
  // Use the API key from the environment variable as per requirements
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("API_KEY not found in process.env. AI features will be limited.");
    return `Explore the collective memories of ${locationName}, a highlight of the Asian journey.`;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a poetic travel historian. Write a 2-sentence captivating description of "${locationName}" in Asia, noting that ${photoCount} people have shared their memories here. Focus on the vibe and culture. Keep it minimal.`,
    });
    
    return response.text || `A place of ${photoCount} shared memories, waiting for your lens.`;
  } catch (error) {
    console.error("Gemini failed:", error);
    return `Explore the collective memories of ${locationName}, a highlight of the Asian journey.`;
  }
};
