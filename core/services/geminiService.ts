
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
        systemInstruction: `You are Ibrahim (Musafir AI), an intelligent travel assistant for the Zindigi app specialized in Umrah, Hajj, and general travel. 
        Your goal is to help users plan trips, offer spiritual advice for pilgrims, and logistics. 
        Be helpful, concise, and enthusiastic. 
        If the user asks for a trip plan, provide a structured itinerary.
        Always output valid JSON when an itinerary is requested.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseText: {
              type: Type.STRING,
              description: "A friendly conversational response.",
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
    return { text: "I'm having trouble connecting to the network. Please try again later." };
  }
};
