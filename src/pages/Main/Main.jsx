import { useEffect, useState } from "react";
import Navbar from "../../components/Navigation/NavBar";
import CardGrid from "../../components/CardGrid/CardGrid";
import SkeletonGrid from "../../components/Preloader/Preloader";
import * as api from "../../utils/api";

const cardsPerPage = 15;
const maxAttempts = 2;

const Main = () => {
  const [generationId, setGenerationId] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [failedPokemons, setFailedPokemons] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Efeito para transição de carregamento
  useEffect(() => {
    if (displayedPokemons.length > 0) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 500); // Tempo da transição
      return () => clearTimeout(timer);
    }
  }, [displayedPokemons, isLoading]);

  // Utilitário para filtrar Pokémons válidos
  const getValidPokemons = () =>
    allPokemons.filter(
      (p) => !failedPokemons[p.name] || failedPokemons[p.name] < maxAttempts
    );

  // Tenta buscar preview de um Pokémon com retry tracking
  const fetchPokemonWithRetry = async (pokemon, failedMap) => {
    try {
      const data = await api.getPokemonPreview(pokemon.name);
      if (!data?.image) throw new Error();
      if (failedMap[pokemon.name]) delete failedMap[pokemon.name];
      return { name: pokemon.name, image: data.image };
    } catch {
      failedMap[pokemon.name] = (failedMap[pokemon.name] || 0) + 1;
      console.warn(
        `Falha ao carregar ${pokemon.name} (tentativa ${
          failedMap[pokemon.name]
        })`
      );
      return null;
    }
  };

  // Carrega a geração ao mudar
  useEffect(() => {
    const loadGeneration = async () => {
      setIsLoading(true);
      try {
        const data = await api.getPokemonsByGeneration(generationId);
        setAllPokemons(data);
        setFailedPokemons({});
        setCurrentPage(1);
      } catch (err) {
        console.error("Erro ao carregar geração:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGeneration();
  }, [generationId]);

  // Atualiza total de páginas com base nos válidos
  useEffect(() => {
    const validCount = getValidPokemons().length;
    setTotalPages(Math.max(1, Math.ceil(validCount / cardsPerPage)));
  }, [allPokemons, failedPokemons]);

  // Carrega os pokémons da página atual
  useEffect(() => {
    if (!allPokemons.length) return;

    const loadPage = async () => {
      setIsLoading(true);
      const validPokemons = getValidPokemons();
      const start = (currentPage - 1) * cardsPerPage;
      const end = start + cardsPerPage;
      const pageSlice = validPokemons.slice(start, end);

      const newFailed = { ...failedPokemons };
      const results = await Promise.all(
        pageSlice.map((p) => fetchPokemonWithRetry(p, newFailed))
      );

      const successful = results.filter(Boolean);
      setDisplayedPokemons(successful);

      // Atualiza falhas se houve mudança
      const failedChanged =
        JSON.stringify(newFailed) !== JSON.stringify(failedPokemons);
      if (failedChanged) setFailedPokemons(newFailed);

      // Recalcula páginas caso falhem demais
      const pages = Math.max(
        1,
        Math.ceil(getValidPokemons().length / cardsPerPage)
      );
      if (currentPage > pages) setCurrentPage(pages);

      setIsLoading(false);
    };

    loadPage();
  }, [allPokemons, currentPage, failedPokemons]);

  // Retorna pagina inicial
  return (
    <>
      <div className="main__gen-list">
        <Navbar onSelectGeneration={(id) => setGenerationId(id)} />
      </div>

      <div className="main__card-grid">
        {(isLoading || isTransitioning) && (
          <SkeletonGrid
            count={cardsPerPage}
            className={`skeleton-container ${!isLoading && "fade-out"}`}
          />
        )}

        {displayedPokemons.length > 0 && (
          <CardGrid
            pokemons={displayedPokemons}
            className={`card-grid-container ${
              !isLoading && !isTransitioning ? "fade-in" : ""
            }`}
          />
        )}
      </div>

      <div className="main__pagination">
        <button
          disabled={currentPage === 1 || isLoading}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Próxima
        </button>
      </div>
    </>
  );
};

export default Main;
