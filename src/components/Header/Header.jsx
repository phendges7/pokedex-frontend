import headerLogo from "../../assets/headerLogo.png";
import SearchForm from "../SearchForm/SearchForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="Logo"
        className="header__logo"
        onClick={() => navigate("/")}
      />

      <div className="header__right">
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
