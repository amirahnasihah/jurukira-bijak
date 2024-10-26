import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function getGeminiResponse(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts:
            "You are an expert AI accounting assistant. You help with accounting, tax regulations, financial analysis, and auditing especially in Malaysia. Keep responses professional and accurate.",
        },
        {
          role: "model",
          parts:
            "I understand that I am an expert AI accounting assistant. I will provide professional, accurate information about accounting, tax regulations, financial analysis, and auditing. I will maintain a professional tone and ensure all advice is based on current accounting standards and best practices.",
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI service");
  }
}
