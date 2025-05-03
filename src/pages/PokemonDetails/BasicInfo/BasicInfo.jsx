import React from "react";
import PropTypes from "prop-types";

const PokemonBasicInfo = ({ pokemon, image }) => (
  <div className="pokemon-details__content">
    <div className="pokemon-details__image-wrapper">
      <img className="pokemon-details__image" src={image} alt={pokemon.name} />
    </div>
    <div className="pokemon-details__info">
      <table className="pokemon-details__content-table">
        <tbody>
          <tr>
            <td>Altura</td>
            <td>{pokemon.height}</td>
          </tr>
          <tr>
            <td>Peso</td>
            <td>{pokemon.weight}</td>
          </tr>
          <tr>
            <td>Tipo(s)</td>
            <td>{pokemon.types.map((t) => t.type.name).join(", ")}</td>
          </tr>
          <tr>
            <td>Habilidades</td>
            <td>
              <ul className="pokemon-details__abilities-list">
                {pokemon.abilities.map((a) => (
                  <li key={a.ability.name}>{a.ability.name}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

PokemonBasicInfo.propTypes = {
  pokemon: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

export default PokemonBasicInfo;
