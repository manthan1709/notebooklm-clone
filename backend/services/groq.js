import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function scoreChunk(
  question,
  chunk
) {

  const response =
    await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Rate relevance from 0 to 100. Return ONLY a number."
        },
        {
          role: "user",
          content:
            `Question:
${question}

Chunk:
${chunk}`
        }
      ],
      model:
        "llama-3.3-70b-versatile",
    });

  return parseInt(
    response.choices[0]
      .message.content
  ) || 0;
}

export async function askGroq(
  docs,
  question
) {

  console.log(
    "LLM Re-ranking Running..."
  );

  const scoredDocs = [];

  for (const doc of docs) {

    const score =
      await scoreChunk(
        question,
        doc.pageContent
      );

    scoredDocs.push({
      content:
        doc.pageContent,
      score,
    });
  }

  scoredDocs.sort(
    (a,b) =>
      b.score - a.score
  );

  const context =
    scoredDocs
      .slice(0,4)
      .map(
        d => d.content
      )
      .join("\n\n");

  const prompt = `
You are a helpful assistant.

Use ONLY the context below.

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
      model:
        "llama-3.3-70b-versatile",
    });

  return response
    .choices[0]
    .message.content;
}