import React, { useState, useEffect, useRef } from "react";
import { Service } from "../services/DBService";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import "./Details.css";
import edit from "../images/edit.png";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMON } from "../graphql/graphql-pokeapi";
import open_pokeball from "../images/open_pokeball.png";
import pokeball from "../images/pokeball.png";

function Details(result) {
  const data = result.pokemon;
  const isFromMyPokemonList = data.myPokemonId === undefined ? false : true;
  const { loading, data: { pokemon = [] } = {} } = useQuery(GET_POKEMON, {
    variables: { name: data.name },
    skip: isFromMyPokemonList,
  });
  const [pokemonData, setPokemonData] = useState(data);
  const [pokemonName, setPokemonName] = useState(pokemonData.name);

  const [isEditing, setIsEditing] = useState(false);
  const inputName = useRef();

  useEffect(() => {
    if (isEditing) {
      inputName.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setPokemonData({ ...pokemonData, name: pokemonName });
  }, [pokemonName]);

  useEffect(() => {
    if (loading) {
      return <>Loading!</>;
    } else {
      if (!isFromMyPokemonList) {
        setPokemonData(pokemon);
        console.log(pokemonData);
      }
    }
  }, [loading]);

  // if (loading) {
  // return <>LOADING!</>;
  // }

  console.log();

  return (
    <>
      <div className="details-container">
        <div className="details-header">
          {pokemonData.sprites ? (
            <img
              src={pokemonData.sprites.front_default}
              className="details-img"
              alt="item"
            />
          ) : null}
          {pokemonData.name ? (
            <form className="details-name-container">
              <input
                className="details-name"
                type="text"
                ref={inputName}
                value={pokemonData.name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isEditing ? "" : "disabled"}
              />
              {isFromMyPokemonList ? (
                <div onClick={handleClick} className="details-edit-container">
                  <img src={edit} className="details-edit" />
                </div>
              ) : null}
            </form>
          ) : null}

          {pokemonData.types ? (
            <div className="details-types-container">
              <div className="details-values">
                {pokemonData.types.map((type) => (
                  <div className={`details-value ${type.type.name}`}>
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="details">
          {pokemonData.abilities ? (
            <div className="details-pokemon-container">
              <div className="details-title">ABILITIES</div>
              <div className="details-values">
                {pokemonData.abilities.map((ability) => (
                  <div className="details-value">{ability.ability.name}</div>
                ))}
              </div>
            </div>
          ) : null}
          {pokemonData.moves ? (
            <div className="details-pokemon-container">
              <div className="details-title">MOVES</div>
              <div className="details-values">
                {pokemonData.moves.map((move) => (
                  <div className="details-value">{move.move.name}</div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="details-button-container">
          {!isFromMyPokemonList ? (
            <Link
              to={{
                pathname: "/my-pokemon-action",
                state: [{ pokemon: pokemonData, isCatching: true }],
              }}
              key={pokemonData.id}
              className="card-link"
            >
              <div className="details-button">
                <img
                  src={pokeball}
                  className="details-button-img"
                  alt={pokeball}
                />
                <div className="details-button-text">CATCH</div>
              </div>
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/my-pokemon-action",
                state: [{ pokemon: pokemonData, isCatching: false }],
              }}
              key={pokemonData.id}
              className="card-link"
            >
              <div className="details-button">
                <img
                  src={open_pokeball}
                  className="details-button-img"
                  alt={open_pokeball}
                />
                <div className="details-button-text">RELEASE</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );

  function handleKeyDown(event) {
    if (event.keyCode == 13) {
      handleSubmit();
    }
  }

  function handleChange(event) {
    let value = event.target.value;
    setPokemonName(value);
    console.log(pokemonData.name);
  }

  function handleSubmit() {
    setPokemonData({ ...pokemonData, name: pokemonData.name });
    console.log(pokemonData);
    Service.catchPokemon(pokemonData);
    setIsEditing(false);
  }

  function handleClick() {
    if (isEditing) {
      handleSubmit();
    } else {
      setIsEditing(true);
      inputName.current.focus();
    }
  }
}

export default Details;
