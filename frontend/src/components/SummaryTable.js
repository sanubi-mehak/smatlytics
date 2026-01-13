import React from "react";

export default function SummaryTable({ data }) {
  if (!data.length) return null;

  const columns = Object.keys(data[0]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Data Preview (First 5 rows)</h3>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff"
      }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} style={th}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col} style={td}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#f1f5f9"
};

const td = {
  border: "1px solid #ddd",
  padding: "8px"
};
