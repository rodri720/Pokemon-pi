import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_TYPES = "GET_TYPES";
export const SET_TYPES = "SET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const SET_POKEMON = "SET_POKEMON";
export const RESET_POKEMON = "RESET_POKEMON";
export const FILTER_POKEMONS_ORIGIN = "FILTER_POKEMONS_ORIGIN";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const SORT_POKEMONS_AZ = "SORT_POKEMONS_AZ";
export const SORT_POKEMONS_BY_ATTACK = "SORT_POKEMONS_BY_ATTACK";

// export const SET_POKE_MENU = "SET_POKE_MENU";

export const getAllPokemons = () => {
  return async function (dispatch) {
    try {
      console.log("Fetching all pokemons...");
      const pokemons = await axios.get(`http://localhost:3001/pokemons`);
      console.log("Fetched all pokemons:", pokemons.data);
      const updatedPokemons = pokemons.data.map((pokemon) => ({
        ...pokemon,
        origin: "api",
      }));
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: updatedPokemons,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getPokemonById = (pokeId) => {
  return async function (dispatch) {
    try {
      console.log(`Fetching pokemon with ID ${pokeId}...`);
      const pokemon = await axios.get(
        `http://localhost:3001/pokemons/${pokeId}`
      );
      console.log(`Fetched pokemon with ID ${pokeId}:`, pokemon.data);
      dispatch({
        type: GET_POKEMON_BY_ID,
        payload: pokemon.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      console.log(`Fetching pokemon with Name ${name}...`);
      const pokemon = await axios.get(
        `http://localhost:3001/finder?name=${name}`
      );
      console.log(`Fetched pokemon with Name ${name}:`, pokemon.data);
      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: pokemon.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const setTypes = (types) => ({
  type: SET_TYPES,
  payload: types,
});

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/types");
      const types = response.data;

      const typeObjects = types.map((type, index) => ({
        name: type,
        typeId: index.toString(),
      }));
      dispatch({
        type: GET_TYPES,
        payload: typeObjects,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    console.log("Pokemon before POST request:", pokemon);

    if (!pokemon.origin) {
      pokemon.origin = "created";
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/pokemons",
        pokemon
      );
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data,
      });
      console.log("Pokemon created successfully!");
    } catch (error) {
      console.error("Error posting pokemon: ", error);
    }
  };
};
export const setPokemon = (pokemon) => ({
  type: SET_POKEMON,
  payload: pokemon,
});

export const resetPokemon = () => {
  return {
    type: RESET_POKEMON,
  };
};
export const filterPokemonsOrigin = (pokemons) => {
  try {
    return {
      type: FILTER_POKEMONS_ORIGIN,
      payload: pokemons,
    };
  } catch (error) {
    console.log(error);
  }
};
export const filterByType = (selectedType) => {
  try {
    return (dispatch, getState) => {
      const { pokemons } = getState();
      let filtered = [];

      if (selectedType === "") {
        filtered = pokemons;
      } else {
        filtered = pokemons.filter((pokemon) =>
          pokemon.types.includes(selectedType)
        );
      }
      dispatch({
        type: FILTER_BY_TYPE,
        payload: filtered,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const sortPokemonsAZ = (order) => {
  return {
    type: SORT_POKEMONS_AZ,
    payload: order,
  };
};

export const sortPokemonsByAttack = (order) => {
  return {
    type: SORT_POKEMONS_BY_ATTACK,
    payload: order,
  };
};
