import React from "react";
import { render } from "@testing-library/react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyPokemonList from "./MyPokemonList";
test("MyPokemonList", () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  });
  // const history = createMemoryHistory();
  // const state = {pokemon={}, isCatching = false};
  // history.push("/my-pokemon-action", state);
  render(
      <ApolloProvider client={client}>
        <MyPokemonList />
      </ApolloProvider>
  );
});
