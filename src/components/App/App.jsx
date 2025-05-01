import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

function App() {
  return (
    <div className="page">
      <Header />
      <main className="content">
        <Main />
      </main>
      <Footer />
    </div>
  );
}

export default App;
