# Pokedex Frontend

Este repositório contém o frontend do projeto **Pokedex**, uma aplicação que permite aos usuários explorar informações detalhadas sobre Pokémon. Ele foi desenvolvido usando React, com foco em modularidade, performance e uma experiência de usuário amigável.

---

## 📖 Visão Geral

O projeto é organizado em uma arquitetura limpa e modular, com componentes reutilizáveis e páginas bem definidas. Ele consome dados de uma API para exibir informações, incluindo uma lista de Pokémon e detalhes específicos de cada um.

---

## ✨ Tecnologias Usadas

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de construção rápida para projetos React.
- **CSS**: Para estilização da interface.
- **ESLint**: Configuração para garantir qualidade de código.

---

## 📂 Estrutura de Diretórios

### Frontend

- **`src`**: Contém os principais arquivos do React.
  - **`components`**: Componentes reutilizáveis da aplicação.
    - **[App](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/App):** Estrutura principal da aplicação.
    - **[Card](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/Card):** Representa cartões individuais para exibir informações de Pokémon.
    - **[CardGrid](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/CardGrid):** Layout em grade para exibir múltiplos cartões.
    - **[Footer](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/Footer):** Rodapé da aplicação.
    - **[Header](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/Header):** Cabeçalho da aplicação.
    - **[Navigation](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/Navigation):** Barra de navegação.
    - **[Preloader](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/Preloader):** Indicador de carregamento.
    - **[SearchForm](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/components/SearchForm):** Formulário de busca de Pokémon.
  - **`pages`**: Páginas principais da aplicação.
    - **[Main](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/pages/Main):** Página principal com uma lista de Pokémon.
    - **[PokemonDetails](https://github.com/phendges7/pokedex-frontend/tree/stage-react-api/src/pages/PokemonDetails):** Página para exibir informações detalhadas de um Pokémon.
  - **`utils`**: Funções utilitárias para suporte à aplicação.
  - **`index.css`**: Estilos globais.
  - **`main.jsx`**: Arquivo de entrada do React.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado (v16+).

### Frontend

1. Clone o repositório:
   ```bash
   git clone https://github.com/phendges7/pokedex-frontend.git
   ```
2. Navegue até a pasta do frontend:
   ```bash
   cd pokedex-frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🛠️ Funcionalidades

1. **Listagem de Pokémon**:
   - Exibição de uma lista com todos os Pokémon, utilizando um layout em grade.
2. **Busca de Pokémon**:
   - Formulário de busca para localizar Pokémon específicos.
3. **Detalhes de Pokémon**:
   - Página dedicada para exibir informações detalhadas sobre um Pokémon.
4. **Carregamento Dinâmico**:
   - Indicador de carregamento para melhorar a experiência do usuário.

---

## 🆕 Novas Implementações Propostas

### 1. Sistema de Favoritos:

Adicionar a funcionalidade de marcar Pokémon como favoritos para rápido acesso.

---

### 2. Animações e Transições

Melhorar a experiência geral do usuário ao adicionar:

- Animações suaves durante a navegação entre páginas.
- Efeitos visuais para interações, como cliques e envio de formulários.

---

### 3. Acessibilidade

Tornar o projeto mais acessível para todos os usuários, incluindo:

- Navegação por teclado.
- Suporte para leitores de tela.
- Modos de alto contraste.

**Benefícios**:

- Garante conformidade com padrões de acessibilidade (WCAG).
- Melhora a experiência geral para todos os usuários.

---

## Link do Website

[WebApp implementado na plataforma VERCEL](https://pokedex-frontend.vercel.app/)

---

## 📧 Contato

Para dúvidas ou sugestões, entre em contato:

- **Autor**: [phendges7](https://github.com/phendges7)

---

## Licença

Este projeto é de uso livre para fins educacionais e pessoais.

---

**Aproveite o projeto e contribua para torná-lo ainda melhor!** 🚀
