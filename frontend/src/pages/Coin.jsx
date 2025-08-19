import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LineChart from "../components/LineChart";
import { CoinContext } from "./context/CoinContext";

function Coin() {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const coinRes = await axios.get(`/api/coin/${coinId}`, {
          params: { currency: currency.name },
        });
        setCoinData(coinRes.data);

        const chartRes = await axios.get(`/api/market_chart`, {
          params: { id: coinId, vs_currency: currency.name, days: 10 },
        });
        setHistoricalData(chartRes.data);

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load coin data");
      } finally {
        setLoading(false);
      }
    };

    if (currency?.name) fetchCoinData();
  }, [coinId, currency]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>{coinData?.name}</h1>
      {historicalData && <LineChart historicalData={historicalData} />}
    </div>
  );
}

export default Coin;
