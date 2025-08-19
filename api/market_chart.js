import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id, vs_currency = "usd", days = "10" } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing coin id" });
  }

  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=daily`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": process.env.COINGECKO_KEY, // ✅ use API key
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "CoinGecko API error" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching market chart:", error);
    res.status(500).json({ error: "Failed to fetch market chart data" });
  }
}
