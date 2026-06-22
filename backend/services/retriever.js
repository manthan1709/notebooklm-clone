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

  const docs =
    await vectorStore.similaritySearch(
      question,
      5
    );

  return docs;
}