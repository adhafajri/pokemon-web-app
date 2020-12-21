import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
test("Home", () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  });
  render(
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
});
