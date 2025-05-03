import React from "react";
import PropTypes from "prop-types";

const PokemonEvolution = ({ evolutionChain }) => (
  <div className="pokemon-details__evolution">
    <h3 className="pokemon-details__subtitle">Evolução</h3>
    <div className="pokemon-details__evolution-chain">
      {evolutionChain.map((evoName) => (
        <div key={evoName} className="pokemon-details__evolution-item">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoName}.png`}
            alt={evoName}
            className="pokemon-details__evolution-image"
          />
          <p className="pokemon-details__evolution-name">{evoName}</p>
        </div>
      ))}
    </div>
  </div>
);

PokemonEvolution.propTypes = {
  evolutionChain: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PokemonEvolution;
