import { QdrantVectorStore }
from "@langchain/qdrant";

import embeddings from "./embeddings.js";

export async function saveToQdrant(chunks) {

  await QdrantVectorStore.fromDocuments(
    chunks,
    embeddings,
    {
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName: "notebooklm",
    }
  );

  console.log("Stored in Qdrant");
}