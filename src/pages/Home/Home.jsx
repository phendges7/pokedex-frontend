import Main from "../Main/Main";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title">Welcome to the Pokedex</h1>
      <p className="home__description">
        Discover and learn about your favorite Pokémon!
      </p>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        alt="Pokedex Logo"
        className="home__logo"
      />
      <p className="home__info">
        This is a simple Pokedex application built with React and the PokeAPI.
        You can search for Pokémon, view their details, and learn more about
        them.
      </p>
      <button className="home__button">
        <a href="/pokedex-frontend/Main" className="home__button-link">
          Go to Pokedex
        </a>
      </button>
    </div>
  );
};
export default Home;
