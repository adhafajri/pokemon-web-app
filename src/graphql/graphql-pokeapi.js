import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export const GET_MY_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id @client
      name @client
      sprites {
        front_default @client
      }
      abilities {
        ability {
          name @client
        }
      }
      moves {
        move {
          name @client
        }
      }
      types {
        type {
          name @client
        }
      }
    }
  }
`;
