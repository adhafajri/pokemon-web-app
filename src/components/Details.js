import React, { useState, useEffect, useRef } from "react";
import { Service } from "../services/DBService";
import { Link } from "react-router-dom";
import "./Details.css";
import edit from "../images/edit.png";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMON } from "../graphql/graphql-pokeapi";
import open_pokeball from "../images/open_pokeball.png";
import pokeball from "../images/pokeball.png";
import Loading from "./Loading";

function Details(result) {
  const data = result ? result.pokemon : null;

  const isFromMyPokemonList = data
    ? data.pokemon
      ? data.pokemon.myPokemonId
        ? true
        : false
      : false
    : false;

  const [pokemonData, setPokemonData] = useState(data ? data.pokemon : null);

  const [pokemonName, setPokemonName] = useState(
    pokemonData ? pokemonData.name : null
  );
  const { loading, data: { pokemon = [] } = {}, error } = useQuery(
    GET_POKEMON,
    {
      variables: { name: pokemonName },
      skip: isFromMyPokemonList,
    }
  );

  const [isEditing, setIsEditing] = useState(false);
  const inputName = useRef();

  useEffect(() => {
    if (isEditing) {
      inputName.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setPokemonData((prevData) => {
      return { ...prevData, name: pokemonName };
    });
  }, [pokemonName]);

  useEffect(() => {
    if (!loading) {
      if (!isFromMyPokemonList) {
        setPokemonData(pokemon);
      }
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Loading text={"No data found!"} />;
  }

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

          <form className="details-name-container">
            <input
              className={isEditing ? "details-name" : "details-name center"}
              type="text"
              ref={inputName}
              value={pokemonData.name ? pokemonData.name : ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isEditing ? "" : "disabled"}
            />
            {isFromMyPokemonList ? (
              <div onClick={handleClick} className="details-edit-container">
                <img src={edit} alt={edit} className="details-edit" />
              </div>
            ) : null}
          </form>

          {pokemonData.types ? (
            <div className="details-types-container">
              <div className="details-values">
                {pokemonData.types.map((type) => (
                  <div
                    key={type.type.name}
                    className={`details-value ${type.type.name}`}
                  >
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
                  <div key={ability.ability.name} className="details-value">
                    {ability.ability.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {pokemonData.moves ? (
            <div className="details-pokemon-container">
              <div className="details-title">MOVES</div>
              <div className="details-values">
                {pokemonData.moves.map((move) => (
                  <div key={move.move.name} className="details-value">
                    {move.move.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {!isFromMyPokemonList ? (
          <Link
            to={{
              pathname: "/my-pokemon-action",
              state: { pokemon: pokemonData, isCatching: true },
            }}
            key={pokemonData.id}
            className="details-button-container"
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
              state: { pokemon: pokemonData, isCatching: false },
            }}
            key={pokemonData.id}
            className={
              isEditing
                ? "details-button-container hide"
                : "details-button-container"
            }
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
    </>
  );

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  }

  function handleChange(event) {
    let value = event.target.value;
    setPokemonName(value);
  }

  function handleSubmit() {
    setPokemonData({ ...pokemonData, name: pokemonData.name });

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
