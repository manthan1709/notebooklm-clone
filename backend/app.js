import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoute from "./routes/upload.js";
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Upload Route
app.use("/upload", uploadRoute);

// Root Route
app.get("/", (req, res) => {
  res.send("Advanced NotebookLM Clone Backend Running");
});
app.get("/env-test", (req, res) => {
    res.json({
      gemini: !!process.env.GEMINI_API_KEY,
      qdrant: !!process.env.QDRANT_API_KEY,
      groq: !!process.env.GROQ_API_KEY,
    });
  });

  app.use("/chat", chatRoute);
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});