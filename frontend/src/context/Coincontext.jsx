import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    try {
      const res = await axios.get(`/api/coins`, {
        params: { vs_currency: currency.name },
      });
      setAllCoin(res.data);
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  return (
    <CoinContext.Provider value={{ allCoin, currency, setCurrency }}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
