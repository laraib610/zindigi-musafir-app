import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTravelItinerary = async (prompt: string): Promise<{ text: string; itinerary?: ItineraryItem[] }> => {
  if (!apiKey) {
    return { text: "API Key is missing. Please configure the environment." };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are Musafir AI, an intelligent travel assistant for the Zindigi app. 
        Your goal is to help users plan trips within Pakistan and abroad. 
        Be helpful, concise, and enthusiastic. 
        If the user asks for a trip plan, provide a structured itinerary.
        Always output valid JSON when an itinerary is requested.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseText: {
              type: Type.STRING,
              description: "A friendly conversational response summarizing the plan.",
            },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING }
                },
                required: ["day", "activity", "location"]
              }
            }
          },
          required: ["responseText"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    const parsed = JSON.parse(jsonText);
    return {
      text: parsed.responseText,
      itinerary: parsed.itinerary
    };

  } catch (error) {
    console.error("Gemini AI Error:", error);
    // Fallback for non-JSON or error scenarios
    return { text: "I'm having trouble connecting to the travel network right now. Please try again later." };
  }
};

export const chatWithMusafir = async (message: string): Promise<string> => {
    if (!apiKey) return "API Key missing.";
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: "You are a helpful customer support agent for Zindigi banking app. Keep answers short."
            }
        });
        return response.text || "Sorry, I didn't catch that.";
    } catch (e) {
        return "Service unavailable.";
    }
}
