import styled from "styled-components";
import weblogro from "../../images/weblogro.webp";
import registerweb from "../../images/registerweb.webp";
import visualcode from "../../images/code.webp";
import formulario from "../../images/formulario.webp";
import mipagina from "../../images/mipagina.webp";
import github from "../../images/github.webp";

const WebCard = () => {
  return (
    <>
      <StyledWrapperWeb>
        <div className="container">
          <div data-text="Certificado" className="glass">
            <img src={weblogro} className="design__illustration-image" />
          </div>
          <div data-text="GitHub" className="glass">
            <img src={github} className="design__illustration-image" />
          </div>

          <div data-text="Visual Studio Code" className="glass">
            <img src={visualcode} className="design__illustration-image" />
          </div>
        </div>

        <div className="container">
          <div data-text="Validación de formularios" className="glass">
            <img src={formulario} className="design__illustration-image" />
          </div>
          <div data-text="Around The US" className="glass">
            <img src={registerweb} className="design__illustration-image" />
          </div>
          <div data-text="Página Web Personal" className="glass">
            <img src={mipagina} className="design__illustration-image" />
          </div>
        </div>
      </StyledWrapperWeb>
    </>
  );
};

const StyledWrapperWeb = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    gap: 0px;
  }

  .container .glass {
    position: relative;
    width: 250px;
    height: 200px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -45px;
    backdrop-filter: blur(10px);
    transform: rotate(calc(var(--r) * 1deg));
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
  }

  .container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: "Poppins", sans-serif;
    border-radius: inherit;
  }

  .container .glass img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

export default WebCard;
