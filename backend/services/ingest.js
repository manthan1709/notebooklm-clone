import { PDFLoader }
from "@langchain/community/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter }
from "@langchain/textsplitters";

export async function loadAndSplitPDF(filePath) {

  console.log("Loading PDF...");

  const loader = new PDFLoader(filePath);

  const docs = await loader.load();

  console.log("Pages loaded:", docs.length);

  const splitter =
    new RecursiveCharacterTextSplitter({
      chunkSize: 5000,
      chunkOverlap: 0,
    });

  const chunks =
    await splitter.splitDocuments(docs);

  console.log("Chunks created:", chunks.length);

  return chunks;
}