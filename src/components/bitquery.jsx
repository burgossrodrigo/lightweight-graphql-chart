import React, { useState } from 'react';
import { gql, ApolloClient, InMemoryCache, useQuery, ApolloProvider  } from '@apollo/client';
import { Typography } from '@mui/material';

let candleSeries;
const Bitquery = () =>{





    const CHART_DATA =  gql`
        query chart{
  ethereum(network: ethereum) {
    dexTrades(
      options: {limit: 100000, asc: "timeInterval.minute"}
      date: {since: "2021-05-23"}
      exchangeName: {is: "Uniswap"}
      baseCurrency: {is: "0x910985ffa7101bf5801dd2e91555c465efd9aab3"}
      quoteCurrency: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}
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
`



        const { loading, data } = useQuery(CHART_DATA);

        if (loading) return <typography variant="h3">Loaging...</typography>

        console.log(data);


        

        return(

            
                <Typography variant="h2">O grafico vem aqui?</Typography>


        );

        

}

export default Bitquery;