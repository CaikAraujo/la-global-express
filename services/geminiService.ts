import { GoogleGenAI, Type } from "@google/genai";
import { BookingIntent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseBookingIntent = async (prompt: string): Promise<BookingIntent | null> => {
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