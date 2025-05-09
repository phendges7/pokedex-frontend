import headerLogo from "../../assets/headerLogo.png";
import home from "../../assets/home-icon.svg";
import instagram from "../../assets/instagram-icon.svg";
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
        onClick={() => navigate("/")}
      />
      <img
        src={headerLogo}
        alt="Logo"
        className="header__logo"
        onClick={() => navigate("/")}
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
                src={instagram}
                alt="Instagram"
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
