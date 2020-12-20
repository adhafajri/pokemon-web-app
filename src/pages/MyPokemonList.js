import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import "../App.css";
import Cards from "../components/Cards";
import { Service } from "../services/DBService";

// function MyPokemonList() {
//   const [results, setResults] = useState();

//   setResults(
//     Service.getMyPokemons().then((data) => {
//       setResults(data);
//       console.log(results);
//     })
//   );

//   console.log(results);
//   return (
//     <>
//       <Cards pokemons={{ results }} />
//     </>
//   );
// }

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
      return <>Loading</>;
    }
  }
}

export default MyPokemonList;
