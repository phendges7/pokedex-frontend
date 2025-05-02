import { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Navigation/NavBar";
import CardGrid from "../../components/CardGrid/CardGrid";

import * as api from "../../utils/api";

const cardsPerPage = 15;
const concurrentRequests = 5;
const maxRetries = 2; // Máximo de tentativas por Pokémon

const Main = () => {
  const [generationId, setGenerationId] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [loadedPokemons, setLoadedPokemons] = useState(new Map());
  const [failedPokemons, setFailedPokemons] = useState(new Map()); // Armazena falhas e tentativas
  const [loading, setLoading] = useState({ generation: false, page: false });
  const [totalPages, setTotalPages] = useState(1);
  const [validPokemons, setValidPokemons] = useState([]); // Lista de Pokémon válidos após filtro

  // Função para buscar múltiplos cards com tratamento de erro
  const fetchPokemonCards = useCallback(async (names) => {
    const requests = names.map((name) =>
      api
        .getPokemonPreview(name)
        .then((data) => ({ name, data, success: true }))
        .catch((err) => ({ name, error: err, success: false }))
    );

    const results = await Promise.all(requests);
    return results;
  }, []);

  // Atualiza a lista de Pokémon válidos quando houver mudanças
  useEffect(() => {
    const valid = allPokemons.filter((p) => !failedPokemons.has(p.name));
    setValidPokemons(valid);
    setTotalPages(Math.ceil(valid.length / cardsPerPage));
  }, [allPokemons, failedPokemons]);

  // Carrega a geração
  useEffect(() => {
    const loadGeneration = async () => {
      setLoading((prev) => ({ ...prev, generation: true }));
      try {
        const data = await api.getPokemonsByGeneration(generationId);
        setAllPokemons(data);
        setLoadedPokemons(new Map());
        setFailedPokemons(new Map());
        setCurrentPage(1);
      } catch (err) {
        console.error("Erro ao carregar geração:", err);
      } finally {
        setLoading((prev) => ({ ...prev, generation: false }));
      }
    };

    loadGeneration();
  }, [generationId]);

  // Carrega os cards da página atual
  useEffect(() => {
    if (!validPokemons.length) return;

    const loadPage = async () => {
      setLoading((prev) => ({ ...prev, page: true }));

      // Pokémon que precisam ser carregados para esta página
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const pagePokemons = validPokemons.slice(startIndex, endIndex);

      // Filtra apenas os que não foram carregados ou que falharam menos que maxRetries
      const pokemonsToLoad = pagePokemons.filter((p) => {
        const failedAttempts = failedPokemons.get(p.name) || 0;
        return !loadedPokemons.has(p.name) && failedAttempts < maxRetries;
      });

      // Divide em chunks para requests concorrentes
      const chunks = [];
      for (let i = 0; i < pokemonsToLoad.length; i += concurrentRequests) {
        chunks.push(pokemonsToLoad.slice(i, i + concurrentRequests));
      }

      // Processa os chunks
      for (const chunk of chunks) {
        const results = await fetchPokemonCards(chunk.map((p) => p.name));

        // Atualiza estado com os resultados
        const newLoaded = new Map(loadedPokemons);
        const newFailed = new Map(failedPokemons);

        results.forEach(({ name, data, success, error }) => {
          if (success && data?.image) {
            newLoaded.set(name, { name, image: data.image });
            newFailed.delete(name); // Remove da lista de falhas se houver sucesso
          } else {
            const attempts = (newFailed.get(name) || 0) + 1;
            newFailed.set(name, attempts);
            console.warn(
              `Falha no Pokémon ${name} (tentativa ${attempts})`,
              error
            );
          }
        });

        setLoadedPokemons(newLoaded);
        setFailedPokemons(newFailed);
      }

      // Monta os cards da página atual, substituindo falhas por Pokémon extras se necessário
      let finalCards = [];
      let remainingPokemons = [...validPokemons];

      // Pega os Pokémon da página atual
      let pageCards = remainingPokemons
        .slice(startIndex, endIndex)
        .map((p) => loadedPokemons.get(p.name))
        .filter(Boolean);

      // Se não tiver cards suficientes, busca extras além da página atual
      if (pageCards.length < cardsPerPage) {
        const needed = cardsPerPage - pageCards.length;
        const extraStart = endIndex;
        const extraEnd = extraStart + needed;

        const extraCards = remainingPokemons
          .slice(extraStart, extraEnd)
          .map((p) => loadedPokemons.get(p.name))
          .filter(Boolean);

        finalCards = [...pageCards, ...extraCards].slice(0, cardsPerPage);
      } else {
        finalCards = pageCards;
      }

      setCards(finalCards);
      setLoading((prev) => ({ ...prev, page: false }));
    };

    loadPage();
  }, [
    validPokemons,
    currentPage,
    loadedPokemons,
    failedPokemons,
    fetchPokemonCards,
  ]);

  return (
    <>
      <div className="main__gen-list">
        <Navbar onSelectGeneration={(id) => setGenerationId(id)} />
      </div>

      <div className="main__card-grid">
        {loading.generation ? (
          <p>Carregando geração de Pokémon...</p>
        ) : loading.page ? (
          <p>Carregando página...</p>
        ) : (
          <CardGrid pokemons={cards} />
        )}
      </div>

      <div className="main__pagination">
        <button
          disabled={currentPage === 1 || loading.generation || loading.page}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={
            currentPage === totalPages || loading.generation || loading.page
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Main;
