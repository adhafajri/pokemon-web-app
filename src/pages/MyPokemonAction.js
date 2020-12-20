import React, { useState } from "react";
import "../App.css";
import Cards from "../components/Cards";
import Details from "../components/Details";
import footstep from "../images/footprints.png";
import gotcha from "../images/gotcha.png";
import Action from "../components/Action";
import { Service } from "../services/DBService";
import { v4 as uuidv4 } from "uuid";

class MyPokemonAction extends React.Component {
  render() {
    const [data] = this.props.location.state;
    console.log(data);

    const pokemon = data.pokemon;
    const isCatching = data.isCatching;

    console.log(pokemon);
    if (isCatching) {
      
    } else {
      Service.releasePokemon(pokemon.myPokemonId);
    }

    return (
      <>
        <Action pokemon={pokemon} isCatching={isCatching} />
      </>
    );
  }
}

export default MyPokemonAction;
