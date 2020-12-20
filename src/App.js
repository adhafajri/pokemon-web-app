import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyPokemonList from "./pages/MyPokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import MyPokemonAction from "./pages/MyPokemonAction";

function App() {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Switch>
            <div className="container">
              <Route path="/" exact component={Home} />
              <Route path="/my-pokemon-list" exact component={MyPokemonList} />
              <Route path="/pokemon-details" component={PokemonDetails} />
              <Route path="/my-pokemon-action" component={MyPokemonAction} />
            
            </div>
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
