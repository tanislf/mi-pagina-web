import { Link } from "react-router-dom";
import logoLabel from "../../images/logo.png";

function Navbar({ onContactClick }) {
  return (
    <header className="navbar">
      <div className="navbar__creator">
        <Link to="/">
          <img className="navbar__logo" src={logoLabel} alt="logo de creador" />
        </Link>
      </div>

      <div className="navbar__nav">
        <Link to="/about" className="navbar__link">
          Sobre mí
        </Link>
        <Link to="/design" className="navbar__link">
          Diseño
        </Link>
        <Link to="/photography" className="navbar__link">
          Fotografía
        </Link>
        <Link to="/portfolio" className="navbar__link">
          Portafolio
        </Link>

        <button type="button" className="navbar__link" onClick={onContactClick}>
          Contacto
        </button>
      </div>
    </header>
  );
}

export default Navbar;
