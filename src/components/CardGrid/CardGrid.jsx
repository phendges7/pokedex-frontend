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
          key={pokemon.name}
          className="card"
          onClick={() => handleCardClick(pokemon.name)}
        >
          <img src={pokemon.image} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
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
