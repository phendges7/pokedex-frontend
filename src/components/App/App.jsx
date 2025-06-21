import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../../pages/Home/Home";
import Main from "../../pages/Main/Main";
import PokemonDetails from "../../pages/PokemonDetails/PokemonDetails";

function App() {
  return (
    <div className="page">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/pokedex-frontend" element={<Home />} />
          <Route path="/pokedex-frontend/Main" element={<Main />} />
          <Route
            path="/pokedex-frontend/pokemon/:name"
            element={<PokemonDetails />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
