import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";

export default function CardGrid({ pokemons, className = "" }) {
  return (
    <div className={`card-grid ${className}`}>
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

CardGrid.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
