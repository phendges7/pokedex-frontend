import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Card({ pokemon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokedex-frontend/pokemon/${pokemon.name}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img className="card__image" src={pokemon.image} alt={pokemon.name} />
      <h3 className="card__name">{pokemon.name}</h3>
    </div>
  );
}

Card.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
