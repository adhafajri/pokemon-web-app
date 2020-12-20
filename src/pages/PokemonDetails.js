import React from "react";
import "../App.css";
import Cards from "../components/Cards";
import Details from "../components/Details";

class PokemonDetails extends React.Component {
  render() {
    const [data] = this.props.location.state;
    const pokemon = data.pokemon
    console.log(pokemon);

    return (
      <>
        <Details pokemon={pokemon} />
      </>
    );
  }
}

export default PokemonDetails;
