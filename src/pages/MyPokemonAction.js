import React from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import Action from "../components/Action";
import { Service } from "../services/DBService";

class MyPokemonAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.location ? props.location.state : null,
    };
  }

  render() {
    if (this.state.data === undefined) {
      return <Redirect to="/" />;
    }

    const pokemon = this.state.data ? this.state.data.pokemon : null;
    const isCatching = this.state.data ? this.state.data.isCatching : null;

    if (!isCatching & pokemon) {
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
