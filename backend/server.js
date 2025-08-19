// Import required libraries
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Create Express app
const app = express();

// Allow CORS requests from frontend
app.use(cors());
// API route to get all coins
app.get('/api/coins', async (req, res) => {
  const { vs_currency = 'usd' } = req.query;

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        // 'x-cg-pro-api-key': process.env.COINGECKO_KEY
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'CoinGecko API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch coins list' });
  }
});

// API route to get coin data
app.get('/api/coin/:id', async (req, res) => {
  const { id } = req.params;
  const { currency } = req.query;

  // Build CoinGecko API URL
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

  try {
    // Fetch data from CoinGecko
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        // 'x-cg-pro-api-key': process.env.COINGECKO_KEY // Optional for Pro users
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'CoinGecko API error' });
    }

    const data = await response.json();
    res.json(data); // Send to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch coin data' });
  }
});

// API route to get market chart data
app.get('/api/coin/:id/market_chart', async (req, res) => {
  const { id } = req.params;
  const { vs_currency = 'usd', days = '10' } = req.query;

  // Build CoinGecko API URL for market chart
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=daily`;

  try {
    // Fetch data from CoinGecko
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        // 'x-cg-pro-api-key': process.env.COINGECKO_KEY // Optional for Pro users
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'CoinGecko API error' });
    }

    const data = await response.json();
    res.json(data); // Send to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch market chart data' });
  }
});

// Start the server
app.listen(5000, () => console.log('Proxy server running on http://localhost:5000'));
