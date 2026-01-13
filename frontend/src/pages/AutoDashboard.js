import React, { useState } from "react";
import ChartsSection from "../components/ChartsSection";
import SummaryCards from "../components/SummaryCards";
import FileUpload from "../components/FileUpload";
import SummaryTable from "../components/SummaryTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./AutoDashboard.css";

export default function AutoDashboard() {
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState([]);

  // 📂 When user uploads file
  const handleFileLoad = (rows) => {
    setData(rows);

    if (!rows || rows.length === 0) return;

    const keys = Object.keys(rows[0]);

    // Pick first numeric column automatically
    const numericKey = keys.find(
      (k) => typeof rows[0][k] === "number"
    );

    if (!numericKey) return;

    const labels = rows.slice(0, 10).map((_, i) => i + 1);
    const values = rows.slice(0, 10).map((r) => r[numericKey]);

    setCharts([
      { title: `Bar Chart (${numericKey})`, type: "bar", labels, values },
      { title: `Line Chart (${numericKey})`, type: "line", labels, values },
      { title: `Pie Chart (${numericKey})`, type: "pie", labels, values },
    ]);
  };

  // 📄 DOWNLOAD DASHBOARD AS PDF
  const downloadPDF = async () => {
    const dashboard = document.getElementById("dashboard-content");
    if (!dashboard) return;

    const canvas = await html2canvas(dashboard, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("auto_dashboard.pdf");
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">📊 Auto Generated Dashboard</h1>

      {/* ⬇ PDF BUTTON */}
      <button className="pdf-btn" onClick={downloadPDF}>
        ⬇ Download Dashboard as PDF
      </button>

      {/* EVERYTHING BELOW WILL BE IN PDF */}
      <div id="dashboard-content">
        <FileUpload onDataLoaded={handleFileLoad} />

        <SummaryCards data={data} />

        <ChartsSection charts={charts} />

        {/* Summary table (only summary, not full data) */}
        <SummaryTable data={data} />
      </div>
    </div>
  );
}
