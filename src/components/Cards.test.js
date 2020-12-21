import React from "react";
import { render } from "@testing-library/react";
import Cards from "./Cards";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

test("Action", () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  });
  render(
    <ApolloProvider client={client}>
        <Cards />
    </ApolloProvider>
  );
});
