import React from "react";
import {
  Bar,
  Line,
  Pie,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function ChartsSection({ charts = [] }) {
  // ✅ SAFE CHECK
  if (!charts || charts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>📈 Upload a file to generate charts</p>
      </div>
    );
  }

  return (
    <div className="charts-grid">
      {charts.map((chart, index) => {
        const chartData = {
          labels: chart.labels,
          datasets: [
            {
              label: chart.title,
              data: chart.values,
              backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#EF5350",
                "#AB47BC",
              ],
            },
          ],
        };

        return (
          <div className="chart-card" key={index}>
            <h3>{chart.title}</h3>

            {chart.type === "bar" && <Bar data={chartData} />}
            {chart.type === "line" && <Line data={chartData} />}
            {chart.type === "pie" && <Pie data={chartData} />}
          </div>
        );
      })}
    </div>
  );
}
