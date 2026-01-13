import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import ChartToolbox from "../components/ChartToolbox";
import CanvasBoard from "../components/CanvasBoard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../pages/ManualDashboard.css";

export default function ManualDashboard() {
  const [data, setData] = useState([]);
  const [widgets, setWidgets] = useState([]);

  // Load saved dashboard
  useEffect(() => {
    const saved = localStorage.getItem("dashboard");
    if (saved) setWidgets(JSON.parse(saved));
  }, []);

  // Save dashboard
  useEffect(() => {
    localStorage.setItem("dashboard", JSON.stringify(widgets));
  }, [widgets]);

  const addChart = (type) => {
    if (!data.length) return alert("Upload data first");

    setWidgets([
      ...widgets,
      {
        id: Date.now(),
        type,
        x: 50,
        y: 50,
        w: 320,
        h: 260,
      },
    ]);
  };

  const updateWidget = (id, newProps) => {
    setWidgets(
      widgets.map((w) => (w.id === id ? { ...w, ...newProps } : w))
    );
  };

  const deleteWidget = (id) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  // Export PDF
  const exportPDF = async () => {
    const board = document.getElementById("canvas-board");
    const canvas = await html2canvas(board);
    const pdf = new jsPDF("landscape");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 280, 150);
    pdf.save("dashboard.pdf");
  };

  return (
    <div className="manual-dashboard">
      <h1>📊 Manual Dashboard Builder</h1>

      <div className="top-bar">
        <FileUpload onDataLoaded={setData} />
        <button onClick={exportPDF}>⬇ Export PDF</button>
      </div>

      <div className="dashboard-layout">
        <CanvasBoard
          widgets={widgets}
          data={data}
          updateWidget={updateWidget}
          deleteWidget={deleteWidget}
        />
        <ChartToolbox addChart={addChart} />
      </div>
    </div>
  );
}
