import { Link } from "react-router-dom";
import { useState } from "react";
import logoLabel from "../../images/logo.png";

function Navbar({ onContactClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar__creator">
        <Link to="/" onClick={closeMenu}>
          <img className="navbar__logo" src={logoLabel} alt="logo de creador" />
        </Link>
      </div>

      {/* //boton hamburguesa para abrir y cerrar el menu en mobile, con aria-label
      para accesibilidad, y clases para animacion */}
      <button
        className={`navbar__toggle ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
        <Link to="/about" className="navbar__link" onClick={closeMenu}>
          Sobre mí
        </Link>
        <Link to="/design" className="navbar__link" onClick={closeMenu}>
          Diseño
        </Link>
        <Link to="/photography" className="navbar__link" onClick={closeMenu}>
          Fotografía
        </Link>
        <Link to="/portfolio" className="navbar__link" onClick={closeMenu}>
          Portafolio
        </Link>

        <button
          type="button"
          className="navbar__link"
          onClick={() => {
            onContactClick();
            closeMenu();
          }}
        >
          Contacto
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
