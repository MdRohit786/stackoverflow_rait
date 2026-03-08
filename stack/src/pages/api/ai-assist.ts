import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "No question provided" });

  const models = [
    "meta-llama/llama-3.3-70b-instruct:free",
    "deepseek/deepseek-r1:free",
    "openrouter/auto",
  ];

  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "StackOverflow Clone",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: "You are a helpful programming assistant on a StackOverflow-like platform. Answer programming questions clearly and concisely with code examples where relevant."
            },
            { role: "user", content: question }
          ],
        }),
      });

      const data = await response.json();
      console.log(`Model ${model} response:`, JSON.stringify(data, null, 2));

      if (data.choices?.[0]?.message?.content) {
        return res.status(200).json({ answer: data.choices[0].message.content });
      }
    } catch (error) {
      console.log(`Model ${model} failed:`, error);
    }
  }

  res.status(200).json({ answer: "Sorry, all AI models are currently unavailable. Please try again later." });
}
