import Navbar from "./Navbar/Navbar.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Design from "../pages/Services/Design.jsx";
import Photography from "../pages/Services/Photography.jsx";
import Portfolio from "../pages/Portfolio.jsx";
import ContactForm from "../pages/Contact.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import AddProjectModal from "./Modal/AddProjectModal.jsx";
import Footer from "../components/Footer/Footer.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar onContactClick={() => setIsContactOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/design" element={<Design />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>

        <ContactForm
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
        <AddProjectModal />
        <InfoTooltip />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
