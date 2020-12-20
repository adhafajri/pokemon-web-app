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
        console.log(pokemon);
        store.put(pokemon);
        return tx.complete;
      })
      .then(() => {
        console.log("Pokemon berhasil di simpan.");
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
        console.log("Pokemon berhasil di hapus.");
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
        });
    });
  }
}

export const Service = new DBService();
