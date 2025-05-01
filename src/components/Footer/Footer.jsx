import instagram from "../../assets/instagramIcon.png";
import facebook from "../../assets/facebookIcon.png";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <p className="footer__copyright">
        &copy; 2025 POKEDEX - TUDO NOSSO, NADA DELES
      </p>
      <ul className="footer__social">
        <li className="footer__social-item">
          <a
            href="https://www.instagram.com/"
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
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebook}
              alt="Facebook"
              className="footer__social-icon"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
