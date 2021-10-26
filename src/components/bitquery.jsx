import React, { useEffect, useRef } from 'react';
import { gql, useQuery  } from '@apollo/client';
import { createChart, LastPriceAnimationMode } from "lightweight-charts";
import { CircularProgress } from '@mui/material';
//import styled from 'styled-components'
/*
const StyledChart = styled.div`

  background-color: red;

`*/

const Bitquery = () =>{

  const chartRef = useRef(null);

  const CHART_DATA =  gql`
  query chart{
ethereum(network: bsc) {
dexTrades(
options: {limit: 10, asc: "timeInterval.minute"}
date: {since: "2021-10-26"}
exchangeName: {is: "Pancake"}
baseCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
) {
timeInterval {
  minute(count: 5)
}
baseCurrency {
  symbol
  address
}
baseAmount
quoteCurrency {
  symbol
  address
}
quoteAmount
trades: count
quotePrice
maximum_price: quotePrice(calculate: maximum)
minimum_price: quotePrice(calculate: minimum)
open_price: minimum(of: block, get: quote_price)
close_price: maximum(of: block, get: quote_price)
}
}
}
`;



useEffect(()=> {
  if(chartRef.current){
    const chart = createChart(chartRef.current, {
      width: 600,
      height: 300,
      localization: {
        dateFormat: 'yyyy-mm-dd HH:mm:ss',
    }
    });

    prepareChart(chart);
  }
}, [])
  

      
        const { loading, data } = useQuery(CHART_DATA);

        console.log(data);

         function prepareChart(chart){
          
          

          let changedData = [];

          var areaSeries  = chart.addAreaSeries(
            {
              topColor: 'rgba(21, 146, 230, 0.4)',
              bottomColor: 'rgba(21, 146, 230, 0)',
              lineColor: 'rgba(21, 146, 230, 1)',
              lineStyle: 0,
              lineWidth: 3,
              crosshairMarkerVisible: false,
              crosshairMarkerRadius: 3,
              crosshairMarkerBorderColor: 'rgb(255, 255, 255, 1)',
              crosshairMarkerBackgroundColor: 'rgb(34, 150, 243, 1)',
              lastPriceAnimation: LastPriceAnimationMode.Continuous,
          }
          );

           data.ethereum.dexTrades.map((chart_) => {
            changedData.push({
              time: chart_.timeInterval.minute,
              value: chart_.maximum_price*Math.pow(10,12)
            });
                    
            console.log(changedData);
            return areaSeries.setData(changedData);
        
          })
          

        }


        

        if (loading) return < CircularProgress />

        return (<><div ref={chartRef} /></>);


        /*
        let date_ob = new Date();

        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        // prints date & time in YYYY-MM-DD HH:MM:SS format
        const time = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
        */
        





        



        

}

export default Bitquery;