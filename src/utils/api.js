import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonsByGeneration(generationId) {
  console.log("Fetching Pokémon by generation:", generationId);
  try {
    const response = await axios.get(`${BASE_URL}/generation/${generationId}`);
    const { pokemon_species } = response.data;
    return pokemon_species;
  } catch (error) {
    console.error("Error fetching initial cards:", error);
    throw error;
  }
}

export async function getPokemonDetails(name) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);

    return {
      name: response.data.name,
      image: response.data.sprites.front_default,
    };
  } catch (error) {
    console.error("Error fetching card details:", error);
    throw error;
  }
}
