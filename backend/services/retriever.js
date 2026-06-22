import { QdrantVectorStore }
from "@langchain/qdrant";

import embeddings from "./embeddings.js";

export async function retrieveDocs(question) {

  const vectorStore =
    await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: "notebooklm",
      }
    );

  const queries = [
    question,
    `Explain ${question}`,
    `Detailed information about ${question}`,
    `Give examples of ${question}`,
  ];

  console.log("Multi Query Retrieval Running...");
  console.log(queries);

  let allDocs = [];

  for (const q of queries) {

    const docs =
      await vectorStore.similaritySearch(
        q,
        3
      );

    allDocs.push(...docs);
  }

  const uniqueDocs = [];

  const seen = new Set();

  for (const doc of allDocs) {

    if (
      !seen.has(doc.pageContent)
    ) {

      seen.add(doc.pageContent);

      uniqueDocs.push(doc);
    }
  }

  return uniqueDocs.slice(0, 10);
}