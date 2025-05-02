import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPokemonDetails } from "../../utils/api";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const data = await getPokemonDetails(name);
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [name]);

  if (loading) return <div>Carregando...</div>;
  if (!pokemon) return <div>Pokémon não encontrado</div>;

  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

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
            <div className="pokemon-details__content">
              <div className="pokemon-details__image-wrapper">
                <img
                  className="pokemon-details__image"
                  src={image}
                  alt={pokemon.name}
                />
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
                      <td>
                        {pokemon.types.map((t) => t.type.name).join(", ")}
                      </td>
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
          </div>

          <div className="pokemon-details__back">
            <p className="pokemon-details__description">
              {pokemon.name} é um Pokémon incrível! (Adicione descrição aqui...)
            </p>
            <div className="pokemon-details__graph">
              {/* Aqui você pode adicionar um gráfico com os status */}
            </div>
            <div className="pokemon-details__evolution">
              {/* E aqui a cadeia de evolução */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
