import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SERVICES } from "./data";

export const findBestService = async (userQuery: string): Promise<{ serviceId: string | null; message: string }> => {
    try {
        // For now, using a mock response or checking if key exists.
        // In a real scenario, this would use import.meta.env.VITE_GEMINI_API_KEY
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("API Key missing");
            // Mock simple keyword matching for demo purposes if no key
            const lowerQuery = userQuery.toLowerCase();
            const match = SERVICES.find(s =>
                s.title.toLowerCase().includes(lowerQuery) ||
                s.description.toLowerCase().includes(lowerQuery) ||
                s.tag.toLowerCase().includes(lowerQuery)
            );

            if (match) {
                return {
                    serviceId: match.id,
                    message: `Com base na sua busca por "${userQuery}", recomendamos o serviço ${match.title}.`
                };
            }

            return { serviceId: null, message: "Não encontrei um serviço exato, mas nossos consultores podem ajudar." };
        }

        const ai = new GoogleGenAI({ apiKey });

        // Prepare list of services for context
        const serviceContext = SERVICES.map(s => `ID: ${s.id}, Name: ${s.title}, Desc: ${s.description}`).join('\n');

        const schema: Schema = {
            type: Type.OBJECT,
            properties: {
                recommendedServiceId: {
                    type: Type.STRING,
                    description: "The exact ID of the service that best matches the user's need. If no match, return null.",
                    nullable: true,
                },
                reasoning: {
                    type: Type.STRING,
                    description: "A short, polite sentence in Portuguese explaining why this service was chosen.",
                }
            },
            required: ["reasoning"],
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp", // Updated model name if needed, or stick to flash
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
                You are a helpful concierge for a luxury home and corporate service provider.
                
                Here are our available services:
                ${serviceContext}

                The user asks: "${userQuery}"

                Analyze the user's request and match it to the ONE best service ID from the list.
                If the request is vague or doesn't match any service, set recommendedServiceId to null.
              `
                        }
                    ]
                }
            ],
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.2,
            }
        });

        const resultText = response?.text || null;
        if (!resultText) throw new Error("No response from AI");

        const parsed = JSON.parse(resultText);

        return {
            serviceId: parsed.recommendedServiceId || null,
            message: parsed.reasoning || "Desculpe, não encontrei um serviço exato para isso."
        };

    } catch (error) {
        console.error("Gemini Error:", error);
        return { serviceId: null, message: "Ocorreu um erro ao processar sua busca." };
    }
};
