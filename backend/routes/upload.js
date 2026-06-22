import express from "express";
import multer from "multer";

import { loadAndSplitPDF } from "../services/ingest.js";
import { saveToQdrant } from "../services/qdrant.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    console.log("PDF uploaded");

    const filePath = req.file.path;

    const chunks = await loadAndSplitPDF(filePath);

    console.log("Sending chunks to Qdrant...");

    await saveToQdrant(chunks);

    res.json({
      success: true,
      chunks: chunks.length,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;