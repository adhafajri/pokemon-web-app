import React from "react";
import "../App.css";
import Cards from "../components/Cards";
import { Service } from "../services/DBService";

class Home extends React.Component {
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
    return (
      <>
        <Cards pokemons={this.state.data} />
      </>
    );
  }
}

export default Home;
