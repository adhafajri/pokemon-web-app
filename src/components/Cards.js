import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMONS } from "../graphql/graphql-pokeapi";
import "./Cards.css";

function Cards({ pokemons }) {
  // if (pokemons) {
  //   if (pokemons.pokemons > 0) {
  //     pokemons = pokemons.pokemons;
  //   } else {
  //     return <>Data is not found!</>;
  //   }
  console.log(pokemons);
  // } else {
  //   // return <>Data is not found!</>;
  // }

  return (
    <>
      <div className="cards-container">
        {pokemons &&
          pokemons.map((pokemon) => (
            <Card key={pokemon.myPokemonId === undefined ? pokemon.id : pokemon.myPokemonId} pokemon={pokemon} />
          ))}
      </div>
      {/* <div className="button-container"> */}
      {/* <button className="button" onClick={handleClick}>
          Load more!
        </button> */}
      {/* </div> */}
    </>
  );

  // function handleClick() {
  //   setLimit(limit + 20);
  // }
}

function Card({ pokemon }) {
  const isFromMyPokemonList = pokemon.myPokemonId === undefined ? false : true;

  return (
    <>
      <Link
        to={{
          pathname: "/pokemon-details",
          state: [{ pokemon: pokemon }],
        }}
        key={pokemon.id}
        className="card-link"
      >
        <div className="card">
          <div className="card-container">
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
            <div className="card-owned-text">OWNED: 1</div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Cards;
