import React from "react";
import "./SummaryCards.css";

export default function SummaryCards({ data = [] }) {
  if (!data.length) return null;

  const totalRecords = data.length;
  const totalColumns = Object.keys(data[0]).length;
  const previewRows = Math.min(10, data.length);

  return (
    <>
      <div className="summary-card">
        <span className="summary-title">Total Records</span>
        <span className="summary-value">{totalRecords}</span>
      </div>

      <div className="summary-card">
        <span className="summary-title">Total Columns</span>
        <span className="summary-value">{totalColumns}</span>
      </div>

      <div className="summary-card">
        <span className="summary-title">Preview Rows</span>
        <span className="summary-value">{previewRows}</span>
      </div>
    </>
  );
}
