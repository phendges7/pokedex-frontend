import headerLogo from "../../assets/headerLogo.png";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => {
  return (
    <header className="header">
      <img src={headerLogo} alt="Logo" className="header__logo" />

      <div className="header__right">
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
