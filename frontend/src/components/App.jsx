import Navbar from "./Navbar/Navbar.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Design from "../pages/Services/Design.jsx";
import Photography from "../pages/Services/Photography.jsx";
import Portfolio from "../pages/Portfolio.jsx";
import ContactForm from "../pages/Contact.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import Footer from "../components/Footer/Footer.jsx";
import AddAdminModal from "./Modal/AddAdminModal.jsx";
import AdminMessages from "./Modal/AdminMessagesModal.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/token.js";

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTooltipOpen, SetIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true",
  );

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      localStorage.removeItem("isAdmin");
      setIsAdmin(false);
    }
  }, []);

  //cerrar sesión
  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setIsMessagesModalOpen(false);

    setShowLogoutMessage(true);
    setTimeout(() => setShowLogoutMessage(false), 2500);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar onContactClick={() => setIsContactOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/design"
            element={<Design onContactClick={() => setIsContactOpen(true)} />}
          />
          <Route
            path="/photography"
            element={
              <Photography onContactClick={() => setIsContactOpen(true)} />
            }
          />
          <Route
            path="/portfolio"
            element={
              <Portfolio
                onContactClick={() => setIsContactOpen(true)}
                isAdmin={isAdmin}
                onAdminLogin={() => setIsAdminModalOpen(true)}
                onMessagesClick={() => setIsMessagesModalOpen(true)}
                onLogout={handleLogout}
              />
            }
          />
        </Routes>

        {showLogoutMessage && (
          <p className="portfolio__logout-message">
            ¡Sesión cerrada correctamente!
          </p>
        )}

        <AddAdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onSuccess={() => {
            localStorage.setItem("isAdmin", "true");
            setIsAdmin(true);
            setIsAdminModalOpen(false);
          }}
        />

        {isAdmin && (
          <AdminMessages
            isOpen={isMessagesModalOpen}
            onClose={() => setIsMessagesModalOpen(false)}
          />
        )}

        <ContactForm
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          onSuccess={() => {
            setIsSuccess(true);
            SetIsTooltipOpen(true);
          }}
          onError={() => {
            setIsSuccess(false);
            SetIsTooltipOpen(true);
          }}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={() => SetIsTooltipOpen(false)}
        />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
