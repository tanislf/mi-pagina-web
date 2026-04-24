import { Link } from "react-router-dom";

function Footer({ onContactClick }) {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <h2 className="footer__title">ArtBoom</h2>
          <p className="footer__subtitle">by Tania López Fierros</p>
        </div>

        <nav className="footer__nav">
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
        </nav>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <p className="footer__privacy">
          Tus datos están seguros. Solo los utilizo para fines de contacto y no
          se compartirán con terceros ni se usarán para spam.
        </p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} ArtBoom. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
