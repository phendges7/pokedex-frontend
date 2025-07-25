import headerLogo from "../../assets/headerLogo.png";
import home from "../../assets/home-icon.svg";
import linkedin from "../../assets/linkedin-icon.svg";
import github from "../../assets/github-icon.svg";
import SearchForm from "../SearchForm/SearchForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src={home}
        alt="Home"
        className="header__home"
        onClick={() => navigate("/pokedex-frontend")}
      />
      <img
        src={headerLogo}
        alt="Logo"
        className="header__logo"
        onClick={() => navigate("/pokedex-frontend/Main")}
      />

      <div className="header__right">
        <SearchForm />
        <ul className="header__social">
          <li className="header__social-item">
            <a
              href="https://www.linkedin.com/in/phendges7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="header__social-icon"
              />
            </a>
          </li>
          <li className="header__social-item">
            <a
              href="https://github.com/phendges7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub" className="header__social-icon" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
