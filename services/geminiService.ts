import { GoogleGenAI, Type } from "@google/genai";
import { BookingIntent, InterestType } from "../types";

const getAi = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const parseBookingIntent = async (prompt: string): Promise<BookingIntent | null> => {
  const ai = getAi();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User request: "${prompt}". 
      
      Extract the service type (Cleaning, Repair, Painting, Plumbing, Electrical, Moving), 
      a potential date, specific details, and estimate a price range based on typical market rates.
      
      Return JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            serviceType: { type: Type.STRING, description: "The category of service detected" },
            date: { type: Type.STRING, description: "Proposed date if mentioned, else 'Flexible'" },
            details: { type: Type.STRING, description: "Summary of specific requirements" },
            estimatedPrice: { type: Type.STRING, description: "Estimated price range e.g. '$100 - $150'" },
            confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" }
          },
          required: ["serviceType", "estimatedPrice", "confidence"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BookingIntent;
    }
    return null;

  } catch (error) {
    console.error("Error parsing booking intent:", error);
    return null;
  }
};

export const analyzeIntent = async (message: string): Promise<string | null> => {
  const ai = getAi();
  if (!ai || !message || message.length < 10) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following user message and categorize it into one of these exact categories: 
      "${InterestType.CORPORATE}", "${InterestType.LOGISTICS}", "${InterestType.SUPPORT}", "${InterestType.PARTNERSHIP}", "${InterestType.OTHER}".
      
      Message: "${message}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              enum: Object.values(InterestType),
            },
            confidence: {
              type: Type.NUMBER
            }
          },
          required: ["category"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    const result = JSON.parse(text);
    return result.category;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};