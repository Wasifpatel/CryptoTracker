import React, { useState, useEffect } from "react";
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {

  const [data, setdata] = useState([["Data","Prices"]])

    useEffect(() => {
      let DataCopy = [["Data", "Prices"]];
      if (historicalData && historicalData.prices) {
        historicalData.prices.map((item) => {
          DataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
        });
        setdata(DataCopy);
      }
    }, [historicalData]);

    
    return(
        <div>
          {historicalData && historicalData.prices ? (
            <Chart
              chartType="LineChart"
              data={data}
              height="100%"
              legendToggle
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Loading chart data...
            </div>
          )}
        </div>
    )
}

export default LineChart