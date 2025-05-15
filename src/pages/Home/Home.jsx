const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title">Welcome to the Pokedex</h1>
      <p className="home__description">
        Discover and learn about your favorite Pokémon!
      </p>
      <p className="home__description">POWERED BY</p>
      <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Pokedex Logo"
          className="home__logo"
        />
      </a>
      <button className="home__button">
        <a href="/pokedex-frontend/Main" className="home__button-link">
          Go to Pokedex
        </a>
      </button>
      <p className="home__info">
        Essa e uma simples WebApp de Pokedex, onde voce pode ver os pokemons e
        suas informacoes e aprender mais sobre eles.
      </p>
    </div>
  );
};
export default Home;
