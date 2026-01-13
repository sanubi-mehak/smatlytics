import React from "react";
import * as XLSX from "xlsx";

export default function FileUpload({ onDataLoaded }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // ✅ SAFE CHECK
      if (onDataLoaded) {
        onDataLoaded(jsonData);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
      />
    </div>
  );
}
