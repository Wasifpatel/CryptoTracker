import React, { useContext ,useState, useEffect} from 'react'
import { CoinContext } from '../context/Coincontext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {allCoin,currency} = useContext(CoinContext)
  const [displayCoin, setdisplayCoin] = useState([])
  const [input, setinput] = useState('')
  
  const inputHandler = (event)=>{
    setinput(event.target.value)
    if (event.target.value = " ") {
      setdisplayCoin(allCoin);
    }
  }
  const submitHandler = async(event)=>{
    event.preventDefault();
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setdisplayCoin(coins)
  }

  useEffect(() => {
    setdisplayCoin(allCoin);
  }, [allCoin])
  
  const gridClass = `
  grid 
  grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr]           /* default (5 cols) */
  max-[768px]:grid-cols-[0.5fr_3fr_1fr_1fr]     /* remove Market Cap (4 cols) */
  max-[500px]:grid-cols-[0.5fr_3fr_1fr]         /* remove 24H Change (3 cols) */
  px-5 py-4 items-center border-b border-[#3c3c3c] text-white
`;

  return (
    <div className='px-[0px] pb-[100px]'>
      <div className='max-w-[600px] mt-[40px] mb-[40px] mx-auto flex flex-col items-center text-center gap-[30px]'>
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-2 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          {/* Text */}
          <span className="text-white/90">
            Track <span className="font-semibold">10,000+ cryptocurrencies live</span>
          </span>
        </div>


        {/* <h1 className='font-bold text-36px text-[max(4vw,36px)] leading-[1.5] text-white'>Largest <br/> Crypto Marketplace</h1> */}
        <h1 class="font-bold text-36px text-[max(4vw,36px)] leading-[1.2] bg-gradient-to-r from-[#9f7aea] via-[#805ad5] to-[#6b46c1] bg-clip-text text-transparent">
        Largest Crypto <br /> <span className='text-white'>Marketplace</span>
        </h1>

        <p className="w-[95%] text-white/80 leading-relaxed text-center max-w-2xl mx-auto">
          Welcome to the world's largest cryptocurrency marketplace. 
          Track prices, analyze trends, and discover opportunities in real time.
        </p>

        <form onSubmit={submitHandler} className="flex items-center w-[80%] max-w-2xl rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg overflow-hidden">
          {/* Input */}
          <input onChange={inputHandler} list="coinlist" value={input} required className="flex-1 bg-transparent text-white/90 placeholder-white/50 px-3 py-3 outline-none border-none"
            type="text"
            placeholder="Search cryptocurrencies..."
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          {/* Button */}
          <button type="submit" className="px-5 py-2 bg-gradient-to-r from-[#805ad5] to-[#9f7aea] text-white font-medium rounded-lg mr-2 hover:opacity-90 transition">
            Search
          </button>
        </form>
        <div className="w-[100%] max-w-2xl mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-[#292241] rounded-2xl shadow-lg text-white">
            <h3 className="font-bold text-lg text-[#9f7aea]">10,000+</h3>
            <p className="text-sm text-gray-400">Cryptocurrencies</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-[#292241] rounded-2xl shadow-lg text-white">
            <h3 className="font-bold text-lg text-[#9f7aea]">$2.4T</h3>
            <p className="text-sm text-gray-400">Market Cap</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-[#292241] rounded-2xl shadow-lg text-white">
            <h3 className="font-bold text-lg text-[#9f7aea]">24/7</h3>
            <p className="text-sm text-gray-400">Live Updates</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-[#292241] rounded-2xl shadow-lg text-white">
            <h3 className="font-bold text-lg text-[#9f7aea]">99.9%</h3>
            <p className="text-sm text-gray-400">Uptime</p>
          </div>
        </div>
      </div>
      <div className='max-w-[1000px] mx-auto bg-[#292241] rounded-xl shadow-lg'>
        <div className={`${gridClass}`}>
          <p>Rank</p>
          <p>Name</p>
          <p>Price</p>
          <p className='text-center max-[500px]:hidden'>24H Change</p>
          <p className='text-right max-[768px]:hidden'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item, index)=>(
            <Link to={`/coin/${item.id}`} key={index} className={`${gridClass}`}>
              <p>{item.market_cap_rank}</p>
              <div className='flex items-center gap-[30px]'>
                <img className='w-[35px] max-[500px]:w-[25px]' src={item.image}></img>
                <p>{item.name+" "+item.symbol}</p>
              </div>
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
              <p className={`text-center  max-[500px]:hidden ${item.price_change_percentage_24h>= 0 ? "text-green-500" : "text-red-500"}`}>
                {Math.floor(item.price_change_percentage_24h*100)/100}
              </p>
              <p className='text-right max-[768px]:hidden'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home