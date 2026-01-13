import React, { useState } from "react";
import { uploadAndClean } from "../services/api";

function DynamicData() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const result = await uploadAndClean(file);

      // ✅ download cleaned file
      const downloadUrl = `http://localhost:5000${result.download_url}`;

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "cleaned_data.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      setError("Failed to upload or clean file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-clean">
      <div className="data-clean__card">
        <h2>📤 Raw Data Upload & Auto Cleaning</h2>

        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload} disabled={!file || loading}>
          {loading ? "Cleaning..." : "Upload & Clean"}
        </button>

        {error && <p style={{ color: "red" }}>❌ {error}</p>}
      </div>
    </div>
  );
}

export default DynamicData;
