import Groq from "groq-sdk";
import dotenv from "dotenv"

dotenv.config({
  path: "./.env"
})

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqMain(content) {
  const chatCompletion = await getGroqChatCompletion(content);
  // Print the completion returned by the LLM.
  // console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion
}

export async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}