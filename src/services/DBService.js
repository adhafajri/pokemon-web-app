import idb from "idb";

const DATABASE_NAME = "POKEMONS";
const DATABASE_VERSION = 1;

const dbPromise = idb.open(DATABASE_NAME, DATABASE_VERSION, (upgradeDb) => {
  const pokemonsObjectStore = upgradeDb.createObjectStore("Pokemons", {
    keyPath: "myPokemonId",
  });
  pokemonsObjectStore.createIndex("myPokemonId", "myPokemonId", {
    unique: false,
  });
});

class DBService {
  catchPokemon(pokemon) {
    dbPromise
      .then((db) => {
        const tx = db.transaction("Pokemons", "readwrite");
        const store = tx.objectStore("Pokemons");

        store.put(pokemon);
        return tx.complete;
      })
      .then(() => {
        console.log("Pokemon catched.");
      });
  }

  releasePokemon(id) {
    dbPromise
      .then((db) => {
        const tx = db.transaction("Pokemons", "readwrite");
        const store = tx.objectStore("Pokemons");
        console.log(id);
        store.delete(id);
        return tx.complete;
      })
      .then(function () {
        console.log("Pokemon released.");
      });
  }

  getMyPokemons() {
    return new Promise((resolve) => {
      dbPromise
        .then((db) => {
          const tx = db.transaction("Pokemons", "readonly");
          const store = tx.objectStore("Pokemons");
          return store.getAll();
        })
        .then((pokemons) => {
          resolve(pokemons);
          console.log("Got your Pokemons!");
        });
    });
  }

  getMyPokemonById(id) {
    return new Promise((resolve) => {
      dbPromise
        .then((db) => {
          const tx = db.transaction("Pokemons", "readonly");
          const store = tx.objectStore("Pokemons");
          return store.get(id);
        })
        .then((pokemon) => {
          resolve(pokemon);
          console.log("Got the Pokemon!");
        });
    });
  }
}

export const Service = new DBService();
