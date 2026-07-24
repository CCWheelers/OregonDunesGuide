type FuelPrices = {
  regular: number;
  mid: number;
  premium: number;
  diesel: number;
};

function parsePriceRow(html: string, label: string): FuelPrices | null {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(
    new RegExp(
      `<td>\\s*${escaped}\\s*</td>\\s*<td>\\s*\\$([\\d.]+)\\s*</td>\\s*<td>\\s*\\$([\\d.]+)\\s*</td>\\s*<td>\\s*\\$([\\d.]+)\\s*</td>\\s*<td>\\s*\\$([\\d.]+)\\s*</td>`,
      "i",
    ),
  );
  if (!match) return null;
  const values = match.slice(1, 5).map(Number);
  if (values.some(value => !Number.isFinite(value))) return null;
  return {
    regular: values[0],
    mid: values[1],
    premium: values[2],
    diesel: values[3],
  };
}

export async function GET() {
  try {
    const response = await fetch("https://gasprices.aaa.com/?state=OR", {
      headers: { "User-Agent": "OregonDunesFieldGuide/1.0" },
    });
    if (!response.ok) throw new Error(`AAA returned ${response.status}`);
    const html = await response.text();
    const current = parsePriceRow(html, "Current Avg.");
    const yesterday = parsePriceRow(html, "Yesterday Avg.");
    const weekAgo = parsePriceRow(html, "Week Ago Avg.");
    const monthAgo = parsePriceRow(html, "Month Ago Avg.");
    if (!current) throw new Error("Oregon averages were not found");

    return Response.json(
      { current, yesterday, weekAgo, monthAgo, fetched: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=1800, s-maxage=1800" } },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Price feed unavailable" },
      { status: 502 },
    );
  }
}
