import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./CardGrid.css";

export default function CardGrid({ pokemons }) {
  const navigate = useNavigate();
  const handleCardClick = (name) => {
    navigate(`/pokemon/${name}`);
  };
  return (
    <div className="card-grid">
      {pokemons.map((pokemon) => (
        <div
          className="card-grid__card"
          key={pokemon.name}
          onClick={() => handleCardClick(pokemon.name)}
        >
          <img
            className="card-grid__image"
            src={pokemon.image}
            alt={pokemon.name}
          />
          <h3 className="card-grid__name">{pokemon.name}</h3>
        </div>
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
