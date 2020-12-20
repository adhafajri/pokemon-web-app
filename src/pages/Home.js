import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import "../App.css";
import Cards from "../components/Cards";
import { GET_POKEMONS } from "../graphql/graphql-pokeapi";

function Home() {
  const [limit, setLimit] = useState(20);
  const {
    loading,
    data: { pokemons: { results = [] } = {} } = {},
    error,
  } = useQuery(GET_POKEMONS, {
    variables: { limit: limit, offset: 0 },
  });

  if (loading) {
    return <>LOADING!</>;
  }
  if (error) {
    return <>ERROR!</>;
  }
  if (!results) {
    return <>DATA NOT FOUND!</>;
  }

  return (
    <>
      <Cards pokemons={results} />
      <button className="button" onClick={handleClick}>
        Load more!
      </button>
    </>
  );

  function handleClick() {
    setLimit(limit + 20);
  }
}

export default Home;
