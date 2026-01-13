import React from "react";
import ChartWidget from "./ChartWidget";

export default function CanvasBoard({ widgets, data, updateWidget, deleteWidget }) {
  return (
    <div className="canvas" id="canvas-board">
      {widgets.map((w) => (
        <ChartWidget
          key={w.id}
          widget={w}
          data={data}
          updateWidget={updateWidget}
          deleteWidget={deleteWidget}
        />
      ))}
    </div>
  );
}
