import instagram from "../../assets/linkedin-icon.svg";
import github from "../../assets/github-icon.svg";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <p className="footer__copyright">
        &copy; 2025 POKEDEX - TUDO NOSSO, NADA DELES
      </p>
      <ul className="footer__social">
        <li className="footer__social-item">
          <a
            href="https://www.linkedin.com/in/phendges7/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="footer__social-icon"
            />
          </a>
        </li>
        <li className="footer__social-item">
          <a
            href="https://github.com/phendges7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="GitHub" className="footer__social-icon" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
