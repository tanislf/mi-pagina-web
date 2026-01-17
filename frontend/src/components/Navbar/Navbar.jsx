import { Link } from "react-router-dom";
import logoLabel from "../../images/logo.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__creator">
        <img className="navbar__logo" src={logoLabel} alt="logo de creador" />
      </div>

      <div className="navbar__nav">
        <Link to="/services" className="navbar__link">
          Servicios
        </Link>
        <Link to="/portfolio" className="navbar__link">
          Portafolio
        </Link>
        <Link to="/about" className="navbar__link">
          Sobre mí
        </Link>
        <Link to="/contact" className="navbar__link">
          Contacto
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
