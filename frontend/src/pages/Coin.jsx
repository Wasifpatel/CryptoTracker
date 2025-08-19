import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import LineChart from '../components/LineChart';
import { CoinContext } from '../context/Coincontext';

function Coin() {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState(null);
  const [historicalData, sethistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchhistoricalData = async () => {
    if (!currency?.name) return;
    
    try {
      const res = await fetch(`/api/market_chart?id=${coinId}&vs_currency=${currency.name}&days=10`);
      
      if (!res.ok) {
        throw new Error(`Market chart API request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      sethistoricalData(data);
    } catch (err) {
      console.error('Error fetching historical data:', err);
      setError('Failed to load chart data');
    }
  };

  useEffect(() => {
    if (currency?.name) {
      fetchhistoricalData();
    }
  }, [currency, coinId]);

  useEffect(() => {
    async function fetchCoinData() {
      if (!currency?.name) return;
      
      try {
        setLoading(true);
        setError(null);

        // Call your backend proxy instead of CoinGecko directly
        const res = await fetch(`/api/coin?id=${coinId}&currency=${currency.name}`);

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        setCoinData(data);
      } catch (err) {
        setError(err.message);
        setCoinData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCoinData();
  }, [coinId, currency]);

  if (loading) return(
    <div className='grid place-self-center min-h-[80vh]'>
        <div className='w-[65px] h-[65px] place-self-center border-[5px] border-[#bdbdbd] border-t-[#4500c6] rounded-full animate-spin'>  
        </div>
    </div>
  );
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  const ulstyling = `
    flex justify-between py-[10px] border-b border-[#5f5d5f] list-none
  `;
  if (coinData) {
    return (
      <div className='px-[0] py-[20px] text-white'>
        <div className='flex flex-col items-center gap-[20px] m-[100px auto] mb-[50px]'>
          {coinData?.image?.large && (
            <img className="max-w-[100px]" src={coinData.image.large} alt={coinData.name} />
          )}
          <p>
            <b className='font-semibold text-4xl'>
              {coinData?.name} ({coinData?.symbol?.toUpperCase()})
            </b>
          </p>
        </div>
        <div className='max-w-[600px] h-[250px] m-auto'>
          {historicalData && <LineChart historicalData={historicalData}/>}
        </div>
        <div className='max-w-[600px] my-[50px] mx-auto flex flex-col '>
          <ul className={`${ulstyling}`}>
            <li>Crypto Market Rank</li>
            <li>{coinData?.market_cap_rank}</li>
          </ul>
          <ul className={`${ulstyling}`}>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData?.market_data?.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul className={`${ulstyling}`}>
            <li>Market Cap</li>
            <li>{currency.symbol}{coinData?.market_data?.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul className={`${ulstyling}`}>
            <li>24 Hour High</li>
            <li>{currency.symbol}{coinData?.market_data?.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul className={`${ulstyling}`}>
            <li>24 Hour Low</li>
            <li class="last:font-light">{currency.symbol}{coinData?.market_data?.low_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul></ul>
        </div>
      </div>
    );
  }
  

}

export default Coin;
