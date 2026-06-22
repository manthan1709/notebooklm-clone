export default function ChatBox({
    question,
    setQuestion,
    askQuestion,
    answer,
  }) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Chat With PDF
        </h2>
  
        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask a question..."
          className="w-full p-3 rounded-lg text-black"
        />
  
        <button
          onClick={askQuestion}
          className="bg-green-600 px-4 py-2 rounded-lg mt-3"
        >
          Send
        </button>
  
        {answer && (
          <div className="mt-6 bg-slate-700 p-4 rounded-lg">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  }