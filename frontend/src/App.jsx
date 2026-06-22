import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const uploadPDF = async () => {
    if (!file) {
      alert("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setUploading(true);
      setUploadStatus("⏳ Uploading PDF...");

      const res = await axios.post(
        "http://localhost:8000/upload",
        formData
      );

      setUploadStatus(
        `✅ PDF Uploaded Successfully (${res.data.chunks} chunks stored)`
      );
    } catch (err) {
      console.error(err);
      setUploadStatus("❌ Upload Failed");
    }

    setUploading(false);
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/chat",
        {
          question: userQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Error getting answer",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="layout">

      <div className="sidebar">

        <h1>📚 NotebookLM</h1>

        <div className="glass-card">

          <h3>Upload PDF</h3>

          <label className="file-upload-btn">

            📄 Choose PDF

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

          </label>

          {file && (
            <div className="selected-file">
              📑 {file.name}
            </div>
          )}

          <button
            onClick={uploadPDF}
            disabled={uploading}
          >
            {uploading
              ? "Uploading..."
              : "Upload"}
          </button>

          {uploadStatus && (
            <div className="upload-status">
              {uploadStatus}
            </div>
          )}

        </div>

      </div>

      <div className="workspace">

        <div className="glass-card">

          <h2>Ask Question</h2>

          <input
            type="text"
            placeholder="Ask anything..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askQuestion();
              }
            }}
          />

          <button onClick={askQuestion}>
            Send
          </button>

        </div>

        <div className="glass-card chat-box">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={
                msg.role === "user"
                  ? "user-message"
                  : "ai-message"
              }
            >
              {msg.content}
            </div>

          ))}

          {loading && (
            <div className="ai-message">
              🤖 Thinking...
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default App;