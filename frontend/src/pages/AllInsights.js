import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./AllInsights.css";

export default function AllInsights() {
  const [data, setData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [chat, setChat] = useState([]);
  const [userMsg, setUserMsg] = useState("");

  // 📂 Upload CSV / Excel File
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop().toLowerCase();

    // ✅ CSV FILE
    if (fileExt === "csv") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;

        const rows = text
          .split("\n")
          .slice(1)
          .filter((r) => r.trim() !== "")
          .map((r) => r.split(","));

        setData(rows);
        generateInsights(rows);
      };
      reader.readAsText(file);
    }

    // ✅ EXCEL FILE
    else if (fileExt === "xlsx" || fileExt === "xls") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const workbook = XLSX.read(evt.target.result, {
          type: "binary",
        });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const rows = jsonData.slice(1); // remove header

        setData(rows);
        generateInsights(rows);
      };
      reader.readAsBinaryString(file);
    } 
    
    else {
      alert("Unsupported file type. Please upload CSV or Excel.");
    }
  };

  // 🧠 Level-1 Rule-Based AI Insights
  const generateInsights = (rows) => {
    if (!rows || rows.length === 0) return;

    const totalRows = rows.length;
    const totalCols = rows[0]?.length || 0;

    const generated = [
      `Dataset loaded successfully with ${totalRows} records.`,
      `The dataset contains ${totalCols} columns.`,
      totalRows > 100
        ? "Large dataset detected — insights are statistically meaningful."
        : "Small dataset — insights may be limited.",
      "Generate charts to visually analyze trends.",
      "Upload time-series data to unlock predictive insights."
    ];

    setInsights(generated);
  };

  // 🤖 Simple AI Chatbot (Level-1)
  const sendMessage = () => {
    if (!userMsg.trim()) return;

    let reply = "I am analyzing your dataset.";

    const msg = userMsg.toLowerCase();

    if (msg.includes("trend")) {
      reply = "Use line or bar charts to identify trends over time.";
    } 
    else if (msg.includes("improve")) {
      reply = "Ensure clean numeric data and more records for stronger insights.";
    } 
    else if (msg.includes("predict")) {
      reply =
        "Predictions need historical or time-based data. This feature will be available in Level-2 AI.";
    } 
    else if (msg.includes("summary")) {
      reply = `Your dataset contains ${data.length} records. Check the insights board for details.`;
    }

    setChat([...chat, { user: userMsg, bot: reply }]);
    setUserMsg("");
  };

  return (
    <div className="ai-page">
      <h1>🧠 AI-Powered Insights & Assistant</h1>

      {/* Upload Section */}
      <div className="upload-box">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>

      <div className="ai-layout">
        {/* LEFT: INSIGHTS WHITEBOARD */}
        <div className="whiteboard">
          <h2>Insights Board</h2>

          {data.length > 0 && (
            <p className="dataset-info">
              Rows Loaded: <b>{data.length}</b>
            </p>
          )}

          {insights.length === 0 && (
            <p className="hint">
              Upload a dataset to generate AI insights
            </p>
          )}

          {insights.map((insight, index) => (
            <div key={index} className="insight-card">
              {insight}
            </div>
          ))}
        </div>

        {/* RIGHT: AI CHATBOT */}
        <div className="chatbox">
          <h2>AI Assistant</h2>

          <div className="chat-area">
            {chat.length === 0 && (
              <p className="hint">
                Ask things like “show trends”, “summary”, or “predict outcomes”
              </p>
            )}

            {chat.map((c, i) => (
              <div key={i} className="chat-msg">
                <p><b>You:</b> {c.user}</p>
                <p><b>AI:</b> {c.bot}</p>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Ask about trends, predictions, summary..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
