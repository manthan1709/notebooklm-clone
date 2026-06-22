import dotenv from "dotenv";
import { CohereEmbeddings } from "@langchain/cohere";

dotenv.config();

const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-english-v3.0",
});

export default embeddings;