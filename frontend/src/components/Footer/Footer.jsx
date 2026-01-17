import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">ArtBoom - Tania López Fierros</p>
      <div className="footer__navbar">
        <Link to="/" className="footer__link">
          Inicio
        </Link>
        <Link to="/services" className="footer__link">
          Servicios
        </Link>
        <Link to="/contact" className="footer__link">
          Contacto
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
