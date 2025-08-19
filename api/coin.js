import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing coin id" });
  }

  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

  try {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (!response.ok) {
      return res.status(response.status).json({ error: "CoinGecko API error" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching coin:", error);
    res.status(500).json({ error: "Failed to fetch coin data" });
  }
}
