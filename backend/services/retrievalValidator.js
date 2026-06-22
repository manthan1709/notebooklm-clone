import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function validateRetrieval(
  question,
  docs
) {

  const context =
    docs
      .map(
        d => d.pageContent
      )
      .join("\n\n")
      .slice(0, 3000);

  const response =
    await groq.chat.completions.create({
      model:
        "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "Answer only YES or NO."
        },
        {
          role: "user",
          content:
            `
Question:
${question}

Retrieved Context:
${context}

Is this context sufficient
to answer the question?
`
        }
      ]
    });

  const result =
    response
      .choices[0]
      .message
      .content
      .trim()
      .toUpperCase();

  return result.includes("YES");
}