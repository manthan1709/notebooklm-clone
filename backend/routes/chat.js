import express from "express";

import { retrieveDocs }
from "../services/retriever.js";

import { askGroq }
from "../services/groq.js";

import {
  validateRetrieval
}
from "../services/retrievalValidator.js";

import {
  rewriteQuery
}
from "../services/queryRewriter.js";

const router =
  express.Router();

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        question
      } = req.body;

      let docs =
        await retrieveDocs(
          question
        );

      console.log(
        "Retrieval Validation Running..."
      );

      const valid =
        await validateRetrieval(
          question,
          docs
        );

      if (!valid) {

        console.log(
          "Retrieval weak. Retrying..."
        );

        const improvedQuery =
          await rewriteQuery(
            question
          );

        console.log(
          "Rewritten Query:",
          improvedQuery
        );

        docs =
          await retrieveDocs(
            improvedQuery
          );
      }

      const answer =
        await askGroq(
          docs,
          question
        );

      res.json({
        answer,
        retrievedChunks:
          docs.length,
      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500)
        .json({
          error:
            error.message
        });
    }
  }
);

export default router;