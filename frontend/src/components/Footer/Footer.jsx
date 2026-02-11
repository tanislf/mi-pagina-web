import { Link } from "react-router-dom";

function Footer({ onContactClick }) {
  return (
    <footer className="footer">
      <div className="footer__nav-container">
        <p className="footer__text">ArtBoom - Tania López Fierros</p>
        <div className="footer__navbar">
          <Link to="/" className="footer__link">
            Inicio
          </Link>
          <Link to="/design" className="footer__link">
            Diseño
          </Link>
          <Link to="/photography" className="footer__link">
            Fotografía
          </Link>
          <button
            type="button"
            className="footer__link"
            onClick={onContactClick}
          >
            Contacto
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
