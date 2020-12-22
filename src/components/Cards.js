import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link, useHistory } from "react-router-dom";
import { GET_POKEMONS } from "../graphql/graphql-pokeapi";
import open_pokeball from "../images/open_pokeball.png";
import Loading from "./Loading";
import "./Cards.css";

function Cards({ pokemons }) {
  const data = pokemons;
  const history = useHistory();
  const isFromMyPokemonList = history
    ? history.location.pathname === "/my-pokemon-list"
    : false;
  const [pokemonsData, setPokemonsData] = useState(data);
  const [limit, setLimit] = useState(20);
  const {
    loading,
    data: { pokemons: { results = [] } = {} } = {},
    error,
  } = useQuery(GET_POKEMONS, {
    variables: { limit: limit, offset: 0 },
    skip: isFromMyPokemonList,
  });

  useEffect(() => {
    if (!loading) {
      if (!isFromMyPokemonList) {
        setPokemonsData(results);
      }
    }
  }, [loading, isFromMyPokemonList, results, pokemonsData]);

  if (error) {
    return (
      <>
        <Loading />
        ERROR!
      </>
    );
  }

  if (pokemonsData && !isFromMyPokemonList) {
    pokemonsData.forEach((pokemon) => {
      let count = 0;
      data.forEach((myPokemon) => {
        if (pokemon.id === myPokemon.id) {
          count++;
        }
      });
      pokemon.count = count;
    });
  }

  return (
    <>
      <div className="cards-container">
        {pokemonsData &&
          pokemonsData.map((pokemon) => (
            <Card
              key={!isFromMyPokemonList ? pokemon.id : pokemon.myPokemonId}
              pokemon={pokemon}
            />
          ))}
      </div>
      {!isFromMyPokemonList && (
        <div className="button-container">
          {!loading ? (
            <div className="button" onClick={handleClick}>
              Load more
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </>
  );

  function handleClick() {
    setLimit(limit + 20);
  }
}

function Card({ pokemon }) {
  const isFromMyPokemonList = pokemon.myPokemonId === undefined ? false : true;

  return (
    <>
      <div className="card">
        <div className="card-container">
          <Link
            to={{
              pathname: "/pokemon-details",
              state: { pokemon: pokemon },
            }}
            key={pokemon.id}
            className="card-link"
          >
            {isFromMyPokemonList && pokemon.sprites ? (
              <img
                src={pokemon.sprites.front_default}
                className="card-img"
                alt={pokemon.name}
              />
            ) : (
              <img
                src={pokemon.image}
                className="card-img"
                alt={pokemon.name}
              />
            )}
            <div className="card-title">{pokemon.name}</div>
          </Link>
          {!isFromMyPokemonList ? (
            <div className="card-owned-text">OWNED: {pokemon.count}</div>
          ) : (
            <Link
              to={{
                pathname: "/my-pokemon-action",
                state: { pokemon: pokemon, isCatching: false },
              }}
              className="button-container button card-link"
            >
              <img
                className="card-button-img"
                src={open_pokeball}
                alt={open_pokeball}
              />
              <div className="card-button-text">RELEASE</div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Cards;
