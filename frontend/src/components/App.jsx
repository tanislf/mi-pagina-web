import Navbar from "./Navbar/Navbar.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Design from "../pages/Services/Design.jsx";
import Photography from "../pages/Services/Photography.jsx";
import Portfolio from "../pages/Portfolio.jsx";
import ContactForm from "../pages/Contact.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import Footer from "../components/Footer/Footer.jsx";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Home />
        <About />
        <Design />
        <Photography />
        <Portfolio />
        <ContactForm />
        <InfoTooltip />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
