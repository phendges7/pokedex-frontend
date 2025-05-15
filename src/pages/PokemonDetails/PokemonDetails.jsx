import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../utils/api";
import PokemonDetailsLayout from "./DetailsLayout/DetailsLayout";

const PokemonDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evolutionChain, setEvolutionChain] = useState([]);

  const handleEvolutionClick = (evolutionName) => {
    navigate(`/pokedex-frontend/pokemon/${evolutionName}`);
  };

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        // Busca os detalhes do Pokémon
        const data = await api.getPokemonDetails(name);
        setPokemon(data);

        // Busca as informações da espécie e a cadeia de evolução
        const speciesData = await api.getSpeciesInfo(data.id);
        const evolutionData = await api.getEvolutionChain(
          speciesData.evolution_chain.url
        );

        // Extrai os nomes das evoluções
        const evolutionNames = extractEvolutionNames(evolutionData.chain);

        // Para CADA nome de evolução, busca os dados do Pokémon
        const evolutionWithImages = await Promise.all(
          evolutionNames.map(async (pokemonName) => {
            try {
              const pokemonData = await api.getPokemonDetails(pokemonName);

              return {
                name: pokemonName,
                image:
                  pokemonData.sprites?.other?.["official-artwork"]
                    ?.front_default,
              };
            } catch (error) {
              console.error(`Error fetching data for ${pokemonName}:`, error);
              return {
                name: pokemonName,
                image: null,
              };
            }
          })
        );
        setEvolutionChain(evolutionWithImages);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [name]);

  // Função para extrair os nomes das evoluções
  function extractEvolutionNames(chain) {
    const names = [];
    function traverseChain(node) {
      names.push(node.species.name);
      node.evolves_to.forEach(traverseChain);
    }
    traverseChain(chain);
    return names;
  }

  return (
    <PokemonDetailsLayout
      pokemon={pokemon}
      evolutionChain={evolutionChain}
      loading={loading}
      onEvolutionClick={handleEvolutionClick}
    />
  );
};

export default PokemonDetails;
