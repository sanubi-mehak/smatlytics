export function parseCSV(text) {
  const lines = text.split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  const rows = lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i]?.trim();
    });
    return obj;
  });

  return rows.filter(r => Object.keys(r).length > 0);
}

export function getNumericColumns(data) {
  const sample = data[0] || {};
  return Object.keys(sample).filter(
    key => !isNaN(parseFloat(sample[key]))
  );
}

export function getSummary(data) {
  return {
    totalRecords: data.length,
  };
}
