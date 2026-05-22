import { GoogleGenAI, Type } from "@google/genai";
import { MarketingKit, MarketType, Note, CoreMessaging, TacticalAssets, PodcastMatch, TacticalAssetTarget } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});
const model = "gemini-3.5-flash";

export async function generateMarketStrategy(notes: Note[], marketType: MarketType): Promise<Partial<MarketingKit>> {
  const systemInstruction = `
    You are markitABLE, a world-class marketing strategist and copywriter.
    Your goal is to transform a collection of raw notes, ideas, and LLM outputs into a high-conversion marketing strategy.
    
    Framework Selection:
    - If marketType is 'niche' (underserved): Use the 3-Feature Framework.
      1. Core differentiation (unique)
      2. UX advantage (better to use)
      3. Trust/values alignment (why choose you)
    - If marketType is 'saturated': Use the 3 Distinct Differentiators Framework.
      Focus on being fundamentally different, not incrementally better. Each solves a separate angle of the user's problem.

    Output must be a structured JSON object matching the requested schema.
    Be poetic yet practical, intelligent, and grounded (Vogue/Esquire editorial vibe).
  `;

  const combinedNotes = notes.map((n, i) => `--- Entry ${i + 1} ---\n${n.content}`).join('\n\n');

  const response = await ai.models.generateContent({
    model,
    contents: `Analyze these collected notes and generate a market strategy for a ${marketType} market:\n\n${combinedNotes}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          subheadline: { type: Type.STRING },
          valueProposition: { type: Type.STRING },
          big3: {
            type: Type.OBJECT,
            properties: {
              feature1: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  why: { type: Type.STRING }
                },
                required: ["title", "description", "why"]
              },
              feature2: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  why: { type: Type.STRING }
                },
                required: ["title", "description", "why"]
              },
              feature3: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  why: { type: Type.STRING }
                },
                required: ["title", "description", "why"]
              }
            },
            required: ["feature1", "feature2", "feature3"]
          },
          marketingPlan: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          podcastOutreach: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING },
              body: { type: Type.STRING }
            },
            required: ["subject", "body"]
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                improvement: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["improvement", "reason"]
            }
          }
        },
        required: ["headline", "subheadline", "valueProposition", "big3", "marketingPlan", "podcastOutreach", "suggestions"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate content");
  }

  return JSON.parse(response.text);
}

export async function generateCoreMessaging(notes: Note[], target: string): Promise<Partial<CoreMessaging>> {
  const systemInstruction = `
    You are markitABLE, a world-class marketing strategist and copywriter.
    Your goal is to transform a collection of raw notes into core messaging assets.
    Be poetic yet practical, intelligent, and grounded (Vogue/Esquire editorial vibe).
  `;

  const combinedNotes = notes.map((n, i) => `--- Entry ${i + 1} ---\n${n.content}`).join('\n\n');
  const targetInstruction = target === 'all' 
    ? "Generate ALL of the following: Positioning Statement, One-Liner, Tagline Options, and Elevator Pitches."
    : `Generate ONLY the ${target}.`;

  const properties: any = {};
  const required: string[] = [];
  
  if (target === 'all' || target === 'positioningStatement') {
    properties.positioningStatement = { type: Type.STRING, description: "Single sentence: 'For [target] who [need], [product] is the [category] that [benefit]. Unlike [alternatives], we [unique approach].'" };
    required.push('positioningStatement');
  }
  if (target === 'all' || target === 'taglineOptions') {
    properties.taglineOptions = { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 variations: short (3-5 words), punchy, memorable" };
    required.push('taglineOptions');
  }
  if (target === 'all' || target === 'elevatorPitch') {
    properties.elevatorPitch = {
      type: Type.OBJECT,
      properties: {
        thirtySecond: { type: Type.STRING, description: "1-2 sentences" },
        oneMinute: { type: Type.STRING, description: "short paragraph" },
        twoMinute: { type: Type.STRING, description: "3-4 paragraphs" }
      },
      required: ["thirtySecond", "oneMinute", "twoMinute"]
    };
    required.push('elevatorPitch');
  }
  if (target === 'all' || target === 'oneLiner') {
    properties.oneLiner = { type: Type.STRING, description: "The absolute simplest explanation: 'We help X do Y'" };
    required.push('oneLiner');
  }

  const response = await ai.models.generateContent({
    model,
    contents: `Analyze these collected notes and generate core messaging.\n\n${targetInstruction}\n\nNotes:\n${combinedNotes}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties,
        required
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate content");
  }

  return JSON.parse(response.text);
}

export async function generateTacticalAssets(notes: Note[], target: TacticalAssetTarget): Promise<Partial<TacticalAssets>> {
  const systemInstruction = `
    You are markitABLE, a world-class marketing strategist and PR writer.
    Your goal is to transform a collection of raw notes into tactical marketing assets.
    CRITICAL TONE GUIDELINES:
    - Keep the tone grounded, operational, and architectural.
    - Avoid manifesto language, hyper-grandiosity, or "crypto whitepaper energy" (e.g. avoid phrases like "sovereign paradigm", "triple-layer sanctuary", "absolute operational velocity").
    - Embrace strong, memorable, and operational phrasing (e.g. "The field proposes; the office disposes" or "capture must be instantaneous, and compliance must be passive").
    - Simply be important instead of trying to sound important.
  `;

  const combinedNotes = notes.map((n, i) => `--- Entry ${i + 1} ---\n${n.content}`).join('\n\n');
  const targetInstruction = `Generate ONLY the ${target}.`;

  const properties: any = {};
  const required: string[] = [];
  
  if (target === 'socialMediaBio') {
    properties.socialMediaBio = { type: Type.STRING, description: "A concise, optimized bio ready for Twitter, Instagram, or LinkedIn." };
    required.push('socialMediaBio');
  }
  if (target === 'pressRelease') {
    properties.pressRelease = { type: Type.STRING, description: "A long-form, structured press release ready for distribution." };
    required.push('pressRelease');
  }

  const response = await ai.models.generateContent({
    model,
    contents: `Analyze these collected notes and generate tactical assets.\n\n${targetInstruction}\n\nNotes:\n${combinedNotes}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties,
        required
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate content");
  }

  return JSON.parse(response.text);
}

export async function generatePodcastOutreach(
  notes: Note[],
  customProductDesc?: string,
  customAudience?: string,
  customValueAngle?: string
): Promise<{ podcastMatches: PodcastMatch[] }> {
  const systemInstruction = `
    You are markitABLE, a world-class PR manager and outreach expert.
    Identify 3 real or highly realistic archetype podcasts that would be a perfect fit for the user's product/service.
    For each podcast, explain why the audience is a fit, and write a personalized, compelling outreach email to the host.
    The email must highlight the unique value proposition and clearly explain why their audience would care.
    Be professional, concise, but warm and engaging. Avoid overly salesy language.
  `;

  const combinedNotes = notes.map((n, i) => `--- Entry ${i + 1} ---\n${n.content}`).join('\n\n');

  let promptText = `Analyze the product notes and specific customization criteria to identify potential podcast matches and draft custom outreach emails.\n\n`;

  if (customProductDesc) {
    promptText += `Specific Product/Service Details:\n${customProductDesc}\n\n`;
  }
  if (customAudience) {
    promptText += `Target Podcast Audience / Niche:\n${customAudience}\n\n`;
  }
  if (customValueAngle) {
    promptText += `Value Angle / Guest Topic Hook:\n${customValueAngle}\n\n`;
  }

  promptText += `General Project Background Notes:\n${combinedNotes || "(No additional notes)"}`;

  const response = await ai.models.generateContent({
    model,
    contents: promptText,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          podcastMatches: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                podcastName: { type: Type.STRING, description: "Name of the podcast" },
                audienceFit: { type: Type.STRING, description: "Why this audience is a perfect match" },
                outreachEmail: {
                  type: Type.OBJECT,
                  properties: {
                    subject: { type: Type.STRING, description: "Catchy email subject line" },
                    body: { type: Type.STRING, description: "The email body text" }
                  },
                  required: ["subject", "body"]
                }
              },
              required: ["podcastName", "audienceFit", "outreachEmail"]
            }
          }
        },
        required: ["podcastMatches"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate content");
  }

  return JSON.parse(response.text);
}
