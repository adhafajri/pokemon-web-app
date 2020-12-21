import React from "react";
import { render } from "@testing-library/react";
import Details from "./Details";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

test("Details", () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  });
  render(
    <ApolloProvider client={client}>
        <Details />
    </ApolloProvider>
  );
});
