import './App.css';
import { Typography } from '@mui/material';
import Bitquery from './components/bitquery';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client'; 

function App() {

  const client = new ApolloClient({
  
    uri: "https://graphql.bitquery.io",
    cache: new InMemoryCache(),
    headers: {
      "Content-Type": "application/json",
    "X-API-KEY": "BQYTYsxZMZA47wBr1PvuU8jYWieM3HSd"
    },  
    });


  return (
    <>
      <ApolloProvider client={client}>
        <Typography variant="h1">Chart</Typography>
      <Bitquery />
      </ApolloProvider>
    </>
  );
}

export default App;
