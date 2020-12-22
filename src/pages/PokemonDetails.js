import React from "react";
import "../App.css";
import Details from "../components/Details";
import { Redirect } from "react-router-dom";

class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.location ? props.location.state : {},
    };
  }

  render() {
    if (!this.state.data) {
      return <Redirect to="/" />;
    }

    console.log(this.state.data);
    const pokemon = this.state.data;
    console.log(pokemon);

    return (
      <>
        <Details pokemon={pokemon} />
      </>
    );
  }
}

export default PokemonDetails;