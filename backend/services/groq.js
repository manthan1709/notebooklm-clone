import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askGroq(context, question) {

  const prompt = `
You are a helpful assistant.

Use ONLY the context below to answer.

Context:
${context}

Question:
${question}
`;

  const response =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

  return response.choices[0].message.content;
}