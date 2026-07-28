// Fetches AAA's Oregon gas price page server-side and returns the state
// average plus the Eugene-Springfield metro, which is Lane County and the
// nearest AAA figure to Florence.
//
// A note on coverage, because it matters for how this gets labelled:
// AAA publishes named metro averages for Eugene-Springfield, Medford,
// Salem, Portland, Albany, Bend, Corvallis, Grants Pass and Pendleton.
// It does NOT publish named figures for Douglas or Coos county, so there
// is no honest AAA number for Winchester Bay or Coos Bay. The page must
// not imply otherwise. Coastal prices typically run above inland ones.
//
// Cached at the CDN for 6 hours so AAA only sees a few requests a day.

const ROWS = [
  ['current', 'Current Avg'],
  ['yesterday', 'Yesterday Avg'],
  ['weekAgo', 'Week Ago Avg'],
  ['monthAgo', 'Month Ago Avg'],
  ['yearAgo', 'Year Ago Avg']
];

function parseBlock(html, marker) {
  const i = html.indexOf(marker);
  if (i === -1) return null;
  const chunk = html.slice(i, i + 3500);
  const out = {};
  for (const [key, label] of ROWS) {
    const j = chunk.indexOf(label);
    if (j === -1) continue;
    const prices = chunk.slice(j, j + 400).match(/\$([0-9]\.[0-9]{2,3})/g);
    if (prices && prices.length >= 4) {
      const [regular, mid, premium, diesel] = prices.map(p => parseFloat(p.slice(1)));
      out[key] = { regular, mid, premium, diesel };
    }
  }
  return out.current ? out : null;
}

export default async () => {
  try {
    const res = await fetch('https://gasprices.aaa.com/?state=OR', {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) oregondunesguide.com conditions widget'
      }
    });
    if (!res.ok) return err('AAA returned ' + res.status);
    const html = await res.text();

    // The state table sits under the state name on the Oregon page.
    const state = parseBlock(html, 'Oregon') || null;
    if (!state) return err('state prices not found');

    // Nearest named metro to the dunes. Lane County, so it covers Florence.
    const eugene = parseBlock(html, 'Eugene-Springfield');

    return Response.json(
      {
        area: 'Oregon statewide',
        // flat fields kept for the homepage console and the price board
        regular: state.current.regular,
        diesel: state.current.diesel,
        ...state,
        nearest: eugene
          ? {
              area: 'Eugene-Springfield',
              note: 'Lane County, the nearest AAA metro to Florence',
              ...eugene
            }
          : null,
        coverageNote:
          'AAA publishes no named average for Douglas or Coos county, so there is no figure for Winchester Bay or Coos Bay. Coastal prices usually run above inland.',
        source: 'AAA Gas Prices',
        fetched: new Date().toISOString()
      },
      {
        headers: {
          'cache-control': 'public, max-age=0, s-maxage=21600',
          'access-control-allow-origin': '*'
        }
      }
    );
  } catch (e) {
    return err(String(e));
  }
};

function err(msg) {
  return Response.json(
    { error: msg },
    { status: 502, headers: { 'access-control-allow-origin': '*' } }
  );
}

export const config = { path: '/api/gas' };
