import { useEffect, useState } from "react";

import Navbar from "../Navigation/NavBar";
import CardGrid from "../CardGrid/CardGrid";

import * as api from "../../utils/api";

const Main = () => {
  const [generationId, setGenerationId] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const cardsPerPage = 20;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchGenerationData() {
      setCurrentPage(1);

      const pokemons = await api.getPokemonsByGeneration(generationId);
      setAllPokemons(pokemons);
    }
    fetchGenerationData();
  }, [generationId]);

  useEffect(() => {
    async function loadPage() {
      const start = (currentPage - 1) * cardsPerPage;
      const end = start + cardsPerPage;
      const currentCards = allPokemons.slice(start, end);

      const cardResults = await Promise.allSettled(
        currentCards.map((pokemon) => api.getPokemonDetails(pokemon.name))
      );

      const successfulCards = cardResults
        .filter((result) => result.status === "fulfilled" && result.value.image)
        .map((result) => ({
          name: result.value.name,
          image: result.value.image,
        }));

      setCards(successfulCards);
    }

    if (allPokemons.length > 0) {
      loadPage();
    }
  }, [allPokemons, currentPage]);

  const totalPages = Math.ceil(allPokemons.length / cardsPerPage);

  return (
    <>
      <div className="main__gen-list">
        <Navbar onSelectGeneration={(id) => setGenerationId(id)} />
      </div>
      <div className="main__card-grid">
        <CardGrid pokemons={cards} />
      </div>
      <div className="main__pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default Main;
