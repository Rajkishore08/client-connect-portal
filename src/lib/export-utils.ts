/**
 * Real client-side Data Exporter Utility (CSV & JSON)
 */

export function exportToCSV<T extends Record<string, any>>(data: T[], filename = "leads_export.csv") {
  if (!data || data.length === 0) {
    throw new Error("No data available to export.");
  }

  // Extract CSV column headers
  const headers = Object.keys(data[0] || {});

  // Convert array of objects to CSV rows
  const csvRows: string[] = [];
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      if (val === null || val === undefined) return '""';
      if (typeof val === "object") {
        return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      }
      const stringVal = String(val).replace(/"/g, '""');
      return `"${stringVal}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToJSON<T>(data: T[], filename = "leads_export.json") {
  if (!data || data.length === 0) {
    throw new Error("No data available to export.");
  }

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
