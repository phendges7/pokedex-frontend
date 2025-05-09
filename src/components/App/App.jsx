import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../../pages/Main/Main";
import PokemonDetails from "../../pages/PokemonDetails/PokemonDetails";

function App() {
  return (
    <div className="page">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/pokedex-frontend" element={<Main />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
