"use server";

import { GoogleGenAI, Type } from "@google/genai";
import { InterestType } from "../../types";

const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const analyzeIntent = async (message: string): Promise<string | null> => {
    if (!ai) {
        console.warn("Gemini API Key not found");
        return null;
    }
    if (!message || message.length < 10) return null;

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
