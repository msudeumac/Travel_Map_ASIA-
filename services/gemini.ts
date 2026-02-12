
import { GoogleGenAI } from "@google/genai";

export const getGeminiLocationStory = async (locationName: string, photoCount: number) => {
  // Use the injected API key directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a poetic travel historian. Write a 2-sentence captivating description of "${locationName}" in Asia, noting that ${photoCount} people have shared their memories here. Focus on the vibe and culture. Keep it minimal.`,
    });
    // Use response.text (property, not method)
    return response.text || `A place of ${photoCount} shared memories, waiting for your lens.`;
  } catch (error) {
    console.error("Gemini failed:", error);
    return `Explore the collective memories of ${locationName}, a highlight of the Asian journey.`;
  }
};
