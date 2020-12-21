import React from "react";
import { render } from "@testing-library/react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyPokemonAction from "./MyPokemonAction";
test("MyPokemonAction", () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  });
  // const history = createMemoryHistory();
  // const state = {pokemon={}, isCatching = false};
  // history.push("/my-pokemon-action", state);
  render(
    <Router>
      <ApolloProvider client={client}>
        <MyPokemonAction />
      </ApolloProvider>
    </Router>
  );
});
