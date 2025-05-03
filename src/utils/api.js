import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonsByGeneration(generationId) {
  try {
    const response = await axios.get(`${BASE_URL}/generation/${generationId}`);
    const { pokemon_species } = response.data;
    return pokemon_species;
  } catch (error) {
    console.error("Error fetching initial cards:", error);
    throw error;
  }
}

export async function getPokemonPreview(name) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    console.log("Pokemon preview response:", response.data.name);
    return {
      name: response.data.name,
      image:
        response.data.sprites?.front_default ||
        response.data.sprites?.other?.["official-artwork"]?.front_default,
    };
  } catch (error) {
    console.error("Error fetching card details:", error);
    throw error;
  }
}

export async function getPokemonDetails(name) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
}

export async function getAllPokemons() {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon?limit=100000&offset=0`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching all Pokémon list:", error);
    throw error;
  }
}

export async function getSpeciesInfo(id) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching species info:", error);
    throw error;
  }
}

export async function getEvolutionChain(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    throw error;
  }
}
