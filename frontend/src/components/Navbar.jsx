import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import arrow from '../assets/arrow_icon.png'
import { CoinContext } from '../context/Coincontext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const navbar_button = `
    flex items-center gap-[10px] px-[10px] py-[10px] m-[20px] bg-white text-[#393939] text-[15px] font-semibold border-2 rounded-[20px] cursor-pointer
    max-w-[900px]:gap-[8px] px-[8px] py-[10px] text-[14px]
    `;
  const {setcurrency} = useContext(CoinContext)

  const currencyhandler = (e)=>{
    switch (e.target.value) {
      case "usd":{
        setcurrency({name: "usd", symbol: "$"});
        break;
      }
      case "eur":{
        setcurrency({name: "eur", symbol: "€"});
        break;
      }
      case "inr":{
        setcurrency({name: "inr", symbol: "₹"});
        break;
      }
      default:{
        setcurrency({name: "usd", symbol: "$"});
        break;
      }
    }
  }

  return (
    <div className='h-16 max-[900px]:grid-cols-[1fr_3fr_1fr_1fr flex items-center justify-between px-[30px] text-[#dddddd] bg-[#0F121A]  '>
        <Link to={'/'}>
        <div className="flex items-center space-x-2">
          {/* Logo Box */}
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#805ad5] to-[#9f7aea] flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
          </div>
          {/* Gradient Text */}
          <span className="text-xl font-bold bg-gradient-to-r from-[#9f7aea] via-[#805ad5] to-[#6b46c1] bg-clip-text text-transparent">
           CryptoTracker
          </span>
        </div>

        </Link>
        <ul className='flex gap-10 cursor-pointer max-[768px]:hidden'>
          <Link to={'/'}><li>Home</li></Link> 
          <li>Features</li>
          <li>Pricing</li>
          <li>Blog</li>
        </ul>
        <div className="flex gap-4 items-center">
          <select
            onChange={currencyhandler}
            className="my-7 px-3 py-2 bg-transparent text-white rounded-lg border-white border-2 cursor-pointer"
            >
            <option value="usd" className="text-white bg-[#131030]">USD</option>
            <option value="eur" className="text-white bg-[#131030]">EUR</option>
            <option value="inr" className="text-white bg-[#131030]">INR</option>
          </select>
          <button className="px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#805ad5] to-[#9f7aea] hover:opacity-90 transition">
            Sign Up
          </button>
        </div>

    </div>
  )
}

export default Navbar