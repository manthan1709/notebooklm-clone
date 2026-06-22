import express from "express";

import { retrieveDocs }
from "../services/retriever.js";

import { askGroq }
from "../services/groq.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { question } = req.body;

    const docs =
      await retrieveDocs(question);

    const context =
      docs.map(doc => doc.pageContent)
          .join("\n\n");

    const answer =
      await askGroq(
        context,
        question
      );

    res.json({
      answer,
      sources: docs.length,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message,
    });

  }

});

export default router;