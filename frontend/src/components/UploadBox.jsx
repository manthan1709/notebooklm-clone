export default function UploadBox({
    file,
    setFile,
    uploadPDF,
  }) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Upload PDF
        </h2>
  
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-4"
        />
  
        <button
          onClick={uploadPDF}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Upload
        </button>
      </div>
    );
  }