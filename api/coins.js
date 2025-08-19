import fetch from "node-fetch";

export default async function handler(req, res) {
  const { vs_currency = "usd" } = req.query;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}`;

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
    console.error("Error fetching coins:", error);
    res.status(500).json({ error: "Failed to fetch coins list" });
  }
}
