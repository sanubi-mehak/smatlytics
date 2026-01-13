import React from "react";
import { Rnd } from "react-rnd";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, PieChart, Pie
} from "recharts";

export default function ChartWidget({ widget, data, updateWidget, deleteWidget }) {
  const keys = Object.keys(data[0] || {});
  const numKey = keys.find(k => typeof data[0][k] === "number");

  const chartData = data.slice(0, 6).map((r, i) => ({
    name: i + 1,
    value: r[numKey]
  }));

  return (
    <Rnd
      size={{ width: widget.w, height: widget.h }}
      position={{ x: widget.x, y: widget.y }}
      onDragStop={(e, d) => updateWidget(widget.id, { x: d.x, y: d.y })}
      onResizeStop={(e, dir, ref, delta, pos) =>
        updateWidget(widget.id, {
          w: ref.offsetWidth,
          h: ref.offsetHeight,
          ...pos
        })
      }
      bounds="parent"
    >
      <div className="widget">
        <span className="delete" onClick={() => deleteWidget(widget.id)}>✖</span>

        {widget.type === "bar" && (
          <BarChart width={260} height={200} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        )}

        {widget.type === "line" && (
          <LineChart width={260} height={200} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="value" stroke="#22c55e" />
          </LineChart>
        )}

        {widget.type === "pie" && (
          <PieChart width={260} height={200}>
            <Pie data={chartData} dataKey="value" outerRadius={80} fill="#f59e0b" />
            <Tooltip />
          </PieChart>
        )}

        {widget.type === "table" && (
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
    </Rnd>
  );
}
