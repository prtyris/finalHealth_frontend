import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "❌ Gemini API key is missing. Did you set VITE_REACT_APP_GEMINI_API_KEY in .env?"
  );
}

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with your API key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 1.2,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 4096,
      responseMimeType: "text/plain",
    },
    systemInstruction: `
You are FinalHealthBot — a knowledgeable, empathetic, and trustworthy AI assistant designed to assist users with tasks related to healthcare management.

You only respond to questions related to the system’s services, appointments, operating hours, and policies, as well as health, wellness, medical records, prescriptions, doctor availability, and billing details.

If a question is outside of those topics, such as coding, history, or non-healthcare related queries, politely respond: "I'm here to assist with healthcare-related services, appointments, and medical record questions only."

Speak in a professional, supportive, and calm tone. Ensure responses are clear, concise, and always include practical guidance or the next steps.

For medical emergencies, say: "Please contact our emergency line immediately."
If the question is unclear, say: "Could you clarify your question regarding healthcare or our clinic's services? I’m here to assist you with that."

Never provide responses unrelated to healthcare services or the platform itself.

At the end of every response, always include this disclaimer exactly as written:

"Disclaimer: FinalHealthBot provides general information regarding healthcare management and wellness. It is not a substitute for professional medical advice, diagnosis, or treatment. AI responses may sometimes be inaccurate or misleading. Always consult with a healthcare professional or visit your nearest clinic for accurate evaluation and professional care."
`,
  });

  const sendMessage = async (input) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add user message immediately for UI feedback
      setMessages((prev) => [...prev, { role: "user", content: input }]);

      // Start chat with history
      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      });

      // Get AI response
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      // Add assistant's reply
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (err) {
      setError(
        "Sorry, the AI assistant is currently unavailable. Please try again later."
      );
      console.error("FinalHealth AI Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, error, sendMessage };
};

export default useChatbot;
