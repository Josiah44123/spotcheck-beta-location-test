import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLoveNote = async (): Promise<string> => {
  const ai = getClient();
  if (!ai) return "My Dearest,\n\nI am so incredibly happy you said yes! You are the sweetest thing in my life and I can't wait to celebrate with you. Happy Valentine's Day! ❤️\n\nLove,\nMe";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a heartfelt, romantic, and slightly playful love letter (about 80-100 words) celebrating that someone just said 'Yes' to being my Valentine. Start with 'My Dearest Valentine,'. Use emojis. Format it with paragraphs.",
      config: {
        thinkingConfig: { thinkingBudget: 0 } // prioritizing speed
      }
    });
    return response.text || "My Dearest Valentine,\n\nRoses are red, violets are blue, I'm so lucky to have a Valentine like you! I promise to make this day as special as you are. 💖\n\nYours truly.";
  } catch (error) {
    console.error("Error generating note:", error);
    return "My Dearest,\n\nEven if the AI fails, my love for you never will! You make every day brighter. Happy Valentine's Day! ❤️";
  }
};