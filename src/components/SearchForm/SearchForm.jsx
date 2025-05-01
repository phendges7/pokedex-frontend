const SearchForm = () => {
  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Procure aqui por um pokemon..."
        className="search-form__input"
      />
      <button type="submit" className="search-form__button">
        BUSCAR
      </button>
    </form>
  );
};

export default SearchForm;
