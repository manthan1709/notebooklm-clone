import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function rewriteQuery(
  question
) {

  const response =
    await groq.chat.completions.create({
      model:
        "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "Rewrite the query to improve document retrieval. Return only the rewritten query."
        },
        {
          role: "user",
          content:
            question
        }
      ]
    });

  return response
    .choices[0]
    .message
    .content
    .trim();
}