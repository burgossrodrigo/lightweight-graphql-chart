import React, { useEffect } from 'react';
import { gql, ApolloClient, InMemoryCache, useQuery, ApolloProvider  } from '@apollo/client';
import { Typography } from '@mui/material';
import { createChart } from "lightweight-charts";

let lineseries;
const Bitquery = () =>{

  useEffect(() => {
    const chart = createChart(document.body, {
      width: 600,
      height: 300,
      localization: {
        dateFormat: 'yyyy-mm-dd HH:mm:ss',
    }
    });
    lineseries = chart.addLineSeries();
  }, []);


  

    const CHART_DATA =  gql`
        query chart{
  ethereum(network: bsc) {
    dexTrades(
      options: {limit: 10000, asc: "timeInterval.minute"}
      date: {since: "2021-01-01"}
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




        const { loading, data } = useQuery(CHART_DATA);

        if (loading ) return <typography variant="h3">Loaging...</typography>

        console.log(data.ethereum.dexTrades);

        let changedData = [];

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
        
        data.ethereum.dexTrades.map((chart_) => {
          changedData.push({
            time: chart_.timeInterval.minute,
            value: chart_.maximum_price*Math.pow(10,12)
          });          
          console.log(changedData);
          lineseries.setData(changedData);
        })


        

        return(

            
                <Typography variant="h2">
                  O grafico vem aqui?
                </Typography>


        );

        

}

export default Bitquery;