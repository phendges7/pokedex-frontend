import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";

export default function CardGrid({
  pokemons = [],
  className = "",
  freeze = false,
}) {
  return (
    <div className={`card-grid ${className}`} data-frozen={freeze}>
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} disabled={freeze} />
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
