// Plain CSV export — Excel opens CSV files natively, so this avoids
// pulling in a spreadsheet library (the popular npm "xlsx" package has
// unresolved prototype-pollution/ReDoS advisories) just to generate a
// simple flat table.
export function downloadCsv(filename: string, rows: Record<string, string>[]) {
  if (rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = [
    headers.map(escape).join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h] ?? "")).join(",")),
  ];
  // BOM so Excel detects UTF-8 correctly instead of mangling accents. The
  // "sep=," line right after is an Excel-only directive that forces it to
  // split on commas — without it, Excel installs set to use ";" as the
  // list separator (common in South Africa) dump every row into one column
  // instead of splitting it into cells.
  const csv = "﻿sep=,\r\n" + lines.join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
