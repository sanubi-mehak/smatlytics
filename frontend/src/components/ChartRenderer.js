import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";

export default function ChartRenderer({ type, data }) {
  const keys = Object.keys(data[0]);
  const numericKey = keys.find(k => typeof data[0][k] === "number");

  const chartData = data.slice(0, 6).map((row, i) => ({
    name: i + 1,
    value: row[numericKey]
  }));

  if (!numericKey) return null;

  return (
    <div className="chart-box">
      <h4>{type.toUpperCase()} Chart</h4>

      {type === "bar" && (
        <BarChart width={300} height={200} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" />
        </BarChart>
      )}

      {type === "line" && (
        <LineChart width={300} height={200} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" stroke="#22c55e" />
        </LineChart>
      )}

      {type === "pie" && (
        <PieChart width={300} height={200}>
          <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={["#6366f1", "#22c55e", "#f59e0b"][i % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}

      {type === "table" && (
        <table>
          <tbody>
            {chartData.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
