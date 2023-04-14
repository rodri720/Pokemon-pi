import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPokemons, getPokemonById } from "../actions/index";
import styles1 from "../styles/pokeCards.module.css";
import styles2 from "../styles/infoText.module.css";
import styles3 from "../styles/cardDisplay.module.css";
import styles4 from "../styles/accesories/buttons.module.css";
import DetailLink from "./buttons/DetailLink";

const DisplayPokemons = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className={`${styles3.container}`}>
      <h1>Display Pokemons</h1>

      {pokemons.map(({ pokeId, name, image, types }) => (
        <div className={`${styles1.card} ${styles2.content}`} key={pokeId}>
          <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
          <img src={image} alt={name} />
          <div>
            <Link
              className={`${styles4.buttonDetails}`}
              to={`/pokemons/${pokeId}`}
              onClick={() => dispatch(getPokemonById(pokeId))}
            >
              <DetailLink />
            </Link>
            <h2>Types: </h2>
            {types.map(({ slot, name }) => (
              <p key={slot}>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayPokemons;