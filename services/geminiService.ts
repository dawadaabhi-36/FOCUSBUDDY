import { GoogleGenAI, Type } from "@google/genai";
import { Mood, Task, AIAdvice } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getStudyAdvice(mood: Mood, tasks: Task[]): Promise<AIAdvice> {
  const taskListString = tasks.length > 0 
    ? tasks.map(t => `- ${t.text}`).join('\n')
    : "No active missions detected in the grid.";

  const prompt = `
    The Neural Core is operating at: "${mood}" frequency.
    Current Tasks in the Neural Grid:
    ${taskListString}

    Provide a highly tactical performance protocol. 
    Tone: Cybernetic Academic Architect. Sharp, focused, high-impact.
    Frequencies:
    - zen: Harmonic immersion, noise cancellation, deep cognitive flow.
    - beast: Maximum overclock, time dilation, brute force problem solving.
    - chaos: Pattern disruption, radical pivots, breaking the standard loop.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the NEURAL FLOW AI Engine. Your goal is to maximize the user's focus and efficiency using unconventional cognitive strategies. Provide insights in JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            protocolName: { type: Type.STRING, description: "Futuristic protocol identifier." },
            innovationThought: { type: Type.STRING, description: "A disruptive thought that forces a new perspective." },
            quote: { type: Type.STRING, description: "High-level performance directive." },
            strategy: { type: Type.STRING, description: "The core tactical approach for this session." },
            actionSteps: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 precision action steps." 
            },
            vibe: { type: Type.STRING, description: "One-word frequency state." }
          },
          required: ["protocolName", "innovationThought", "quote", "strategy", "actionSteps", "vibe"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as AIAdvice;
  } catch (error) {
    console.error("Neural Core Error:", error);
    return {
      protocolName: "SAFE_RECOVERY_V1",
      innovationThought: "Complexity is just data waiting for a simpler algorithm.",
      quote: "Efficiency is not enough; we need impact.",
      strategy: "Isolate the primary variable and solve for it with total focus.",
      actionSteps: ["Pick 1 mission", "Zero environmental noise", "25min focus block"],
      vibe: "RECOVERY"
    };
  }
}