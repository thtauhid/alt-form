import { Request, Response } from "express";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

export const askAI = async (req: Request, res: Response) => {
  const { message } = req.body;

  const params = {
    messages: [
      { role: "system", content: "You are a helpful assisstant." },
      { role: "user", content: message },
    ],
    model: "llama3-70b-8192",
  };

  const chatCompletion = await groq.chat.completions.create(params);

  res.send(chatCompletion.choices[0].message.content);
};
