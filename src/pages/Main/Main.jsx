import { useEffect, useState } from "react";
import Navbar from "../../components/Navigation/NavBar";
import CardGrid from "../../components/CardGrid/CardGrid";
import PreLoader from "../../components/Preloader/Preloader";
import * as api from "../../utils/api";

const cardsPerPage = 15;
const maxAttempts = 2;

const Main = () => {
  const [generationId, setGenerationId] = useState(1);
  const [pokemonData, setPokemonData] = useState({
    all: [],
    displayed: [],
    previous: [],
    failed: {},
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    isTransitioning: false,
  });

  // Busca dados do Pokémon com tratamento de erro
  const fetchPokemonWithRetry = async (name, failedMap) => {
    try {
      const data = await api.getPokemonPreview(name);
      if (!data?.image) throw new Error();
      delete failedMap[name];
      return data;
    } catch {
      failedMap[name] = (failedMap[name] || 0) + 1;
      console.warn(`Falha ao carregar ${name} (tentativa ${failedMap[name]})`);
      return null;
    }
  };

  // Carrega os Pokémon da página atual
  const loadPage = async (allPokemons, failedPokemons, page) => {
    const validPokemons = allPokemons.filter(
      (p) => !failedPokemons[p.name] || failedPokemons[p.name] < maxAttempts
    );
    const start = (page - 1) * cardsPerPage;
    const pageSlice = validPokemons.slice(start, start + cardsPerPage);

    const newFailed = { ...failedPokemons };
    const results = await Promise.all(
      pageSlice.map((p) => fetchPokemonWithRetry(p.name, newFailed))
    );

    return {
      successful: results.filter(Boolean),
      newFailed,
      totalPages: Math.max(1, Math.ceil(validPokemons.length / cardsPerPage)),
    };
  };

  // Carrega uma nova geração
  const loadGeneration = async (id) => {
    setPagination((prev) => ({ ...prev, isLoading: true }));

    try {
      const generationData = await api.getPokemonsByGeneration(id);
      const { successful, newFailed, totalPages } = await loadPage(
        generationData,
        {},
        1
      );

      setPokemonData((prev) => ({
        all: generationData,
        displayed: successful,
        previous: prev.displayed,
        failed: newFailed,
      }));

      setPagination({
        currentPage: 1,
        totalPages,
        isLoading: false,
        isTransitioning: true,
      });

      setTimeout(
        () => setPagination((prev) => ({ ...prev, isTransitioning: false })),
        500
      );
    } catch (err) {
      console.error("Erro ao carregar geração:", err);
      setPagination((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Efeitos
  useEffect(() => {
    loadGeneration(generationId);
  }, [generationId]);

  useEffect(() => {
    if (pagination.currentPage === 1) return;

    const loadCurrentPage = async () => {
      setPagination((prev) => ({ ...prev, isLoading: true }));
      const { successful, newFailed } = await loadPage(
        pokemonData.all,
        pokemonData.failed,
        pagination.currentPage
      );

      setPokemonData((prev) => ({
        ...prev,
        displayed: successful,
        failed: newFailed,
      }));
      setPagination((prev) => ({
        ...prev,
        isLoading: false,
        isTransitioning: true,
      }));

      setTimeout(
        () => setPagination((prev) => ({ ...prev, isTransitioning: false })),
        300
      );
    };

    loadCurrentPage();
  }, [pagination.currentPage]);

  // Bloqueia scroll durante loading
  useEffect(() => {
    document.body.classList.toggle(
      "body--no-scroll",
      pagination.isLoading || pagination.isTransitioning
    );
    return () => document.body.classList.remove("body--no-scroll");
  }, [pagination.isLoading, pagination.isTransitioning]);

  return (
    <>
      {(pagination.isLoading || pagination.isTransitioning) && <PreLoader />}

      <div className="main__gen-list">
        <Navbar onSelectGeneration={setGenerationId} />
      </div>

      <div className="main__card-grid">
        {(pokemonData.displayed.length > 0 ||
          pokemonData.previous.length > 0) && (
          <CardGrid
            pokemons={
              pagination.isLoading
                ? pokemonData.previous
                : pokemonData.displayed
            }
            className={`card-grid-container ${
              !pagination.isLoading && !pagination.isTransitioning
                ? "fade-in"
                : ""
            }`}
          />
        )}
      </div>

      <div className="main__pagination">
        <button
          disabled={pagination.currentPage === 1 || pagination.isLoading}
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage - 1,
            }))
          }
        >
          Anterior
        </button>
        <span>
          Página {pagination.currentPage} de {pagination.totalPages}
        </span>
        <button
          disabled={
            pagination.currentPage === pagination.totalPages ||
            pagination.isLoading
          }
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage + 1,
            }))
          }
        >
          Próxima
        </button>
      </div>
    </>
  );
};

export default Main;
