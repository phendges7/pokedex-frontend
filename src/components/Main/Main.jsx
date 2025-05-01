import { useEffect, useState } from "react";

import Navbar from "../Navigation/NavBar";
import CardGrid from "../CardGrid/CardGrid";

import * as api from "../../utils/api";

const Main = () => {
  const [generationId, setGenerationId] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerationData() {
      setLoading(true);
      try {
        const species = await api.getPokemonsByGeneration(generationId);

        // Pega os primeiros 20 Pokémon da geração por exemplo
        const promises = species
          .slice(0, 20)
          .map((pokemon) => api.getPokemonDetails(pokemon.name));

        const results = await Promise.all(promises);
        setPokemonList(results);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGenerationData();
  }, [generationId]);

  const handleSelectGeneration = (id) => {
    setGenerationId(id);
  };

  return (
    <>
      <div className="main__gen-list">
        <Navbar onSelectGeneration={handleSelectGeneration} />
      </div>
      <div className="main__card-grid">
        {loading ? (
          <p>Carregando Pokémon...</p>
        ) : (
          <CardGrid pokemons={pokemonList} />
        )}
      </div>
    </>
  );
};
export default Main;
