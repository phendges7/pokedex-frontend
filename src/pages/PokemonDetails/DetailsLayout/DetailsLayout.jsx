import React, { useState } from "react";
import PropTypes from "prop-types";
import PokemonBasicInfo from "../BasicInfo/BasicInfo";
import PokemonEvolution from "../Evolution/Evolution";
import Preloader from "../../../components/Preloader/Preloader";

const PokemonDetailsLayout = ({ pokemon, evolutionChain, loading }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default;

  if (loading) return <Preloader />;
  if (!pokemon) return <div>Pokémon não encontrado</div>;

  return (
    <div className="pokemon-details">
      <h2 className="pokemon-details__title">{pokemon.name}</h2>
      <div className="pokemon-details__card-wrapper">
        <div
          className={`pokemon-details__card ${
            isFlipped ? "pokemon-details__card--flipped" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="pokemon-details__front">
            <PokemonBasicInfo pokemon={pokemon} image={image} />
            <div className="pokemon-details__hint">
              <span className="hint-icon">↻</span>
              <span className="hint-text">Clique para virar</span>
            </div>
          </div>

          <div className="pokemon-details__back">
            <p className="pokemon-details__description">
              {pokemon.name} é um Pokémon incrível!
            </p>
            <PokemonEvolution evolutionChain={evolutionChain} />
          </div>
        </div>
      </div>
    </div>
  );
};

PokemonDetailsLayout.propTypes = {
  pokemon: PropTypes.object,
  evolutionChain: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
};

export default PokemonDetailsLayout;
