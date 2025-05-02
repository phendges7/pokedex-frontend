import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../utils/api";

const SearchForm = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPokemons() {
      const data = await api.getAllPokemons();
      setAllPokemons(data);
    }
    fetchAllPokemons();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value.length > 1) {
      const filteredPokemons = allPokemons
        .filter((pokemon) => pokemon.name.startsWith(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filteredPokemons);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await api.getPokemonDetails(input.toLowerCase());
      if (data) navigate(`/pokemon/${data.name}`);
    } catch (error) {
      alert("Pokemon não encontrado!");
    }
  };

  const handleSuggetionClick = (name) => {
    setInput(name);
    setSuggestions([]);
    navigate(`/pokemon/${name}`);
  };

  return (
    <form
      className={`search-form ${
        suggestions.length > 0 ? "search-form--has-suggestions" : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div className="search-form__input-wrapper">
        <input
          type="text"
          placeholder="Procure aqui por um pokemon..."
          className="search-form__input"
          value={input}
          onChange={handleInputChange}
        />

        {suggestions.length > 0 && (
          <ul
            className={`search-form__suggestions search-form__suggestions--visible`}
          >
            {suggestions.map((pokemon) => (
              <li
                key={pokemon.name}
                className="search-form__suggestion"
                onClick={() => handleSuggetionClick(pokemon.name)}
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className={`search-form__button ${
          suggestions.length > 0 ? "search-form__button--has-suggestions" : ""
        }`}
      >
        BUSCAR
      </button>
    </form>
  );
};

export default SearchForm;
