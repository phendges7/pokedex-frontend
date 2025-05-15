import React from "react";

const generations = [
  { id: 1, label: "Geração I" },
  { id: 2, label: "Geração II" },
  { id: 3, label: "Geração III" },
  { id: 4, label: "Geração IV" },
  { id: 5, label: "Geração V" },
  { id: 6, label: "Geração VI" },
  { id: 7, label: "Geração VII" },
  { id: 8, label: "Geração VIII" },
  { id: 9, label: "Geração IX" },
];

export default function NavBar({ onSelectGeneration }) {
  return (
    <nav className="nav">
      <h3 className="nav__title">Lista de Pokemons</h3>
      <p className="nav__description">
        Aqui voce pode ver todos os Pokémons de cada geracao.
        <br />
        Clique em qualquer Pokémon abaixo para ver mais informacoes sobre o
        mesmo.
      </p>
      <ul className="nav__gen-list">
        {generations.map((gen) => (
          <li key={gen.id}>
            <button onClick={() => onSelectGeneration(gen.id)}>
              {gen.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
