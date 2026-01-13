import React from "react";

export default function ChartToolbox({ addChart }) {
  return (
    <div className="toolbox">
      <h3>Charts</h3>
      <button onClick={() => addChart("bar")}>Bar</button>
      <button onClick={() => addChart("line")}>Line</button>
      <button onClick={() => addChart("pie")}>Pie</button>
      <button onClick={() => addChart("table")}>Table</button>
    </div>
  );
}
