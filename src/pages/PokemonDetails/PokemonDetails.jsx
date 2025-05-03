import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../utils/api";
import PokemonDetailsLayout from "./DetailsLayout/DetailsLayout";

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const data = await api.getPokemonDetails(name);
        console.log(data);

        setPokemon(data);
        const speciesData = await api.getSpeciesInfo(data.id);
        const evolutionData = await api.getEvolutionChain(
          speciesData.evolution_chain.url
        );

        setEvolutionChain(extractEvolutionNames(evolutionData.chain));
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [name]);

  function extractEvolutionNames(chain) {
    const names = [];
    function traverse(node) {
      names.push(node.species.name);
      node.evolves_to.forEach(traverse);
    }
    traverse(chain);
    return names;
  }
  debugger;
  return (
    <PokemonDetailsLayout
      pokemon={pokemon}
      evolutionChain={evolutionChain}
      loading={loading}
    />
  );
};

export default PokemonDetails;
