import React from "react";
import "../App.css";
import Cards from "../components/Cards";
import { Service } from "../services/DBService";
import Loading from "../components/Loading";

class MyPokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getPokemons();
  }

  getPokemons() {
    Service.getMyPokemons().then((data) => {
      this.setState({
        data: data,
      });
    });
  }

  render() {
    if (this.state.data.length > 0) {
      return (
        <>
          <Cards pokemons={this.state.data} />
        </>
      );
    } else {
      return (<Loading text={"You have no Pokemons yet!"} />);
    }
  }
}

export default MyPokemonList;
