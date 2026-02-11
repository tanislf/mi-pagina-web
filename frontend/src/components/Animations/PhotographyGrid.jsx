import styled from "styled-components";

import fuente from "../../images/fuente.webp";
import londres from "../../images/londres.webp";
import roma from "../../images/roma.webp";
import suiza1 from "../../images/suiza1.webp";
import suiza2 from "../../images/suiza2.webp";
import capilla from "../../images/capilla.webp";

const PhotohraphyCard = () => {
  return (
    <>
      <StyledWrapperPhoto>
        <div className="container">
          <div data-text="Magic Garden" className="glass">
            <img src={fuente} className="design__illustration-image" />
          </div>
          <div data-text="The Queen" className="glass">
            <img src={londres} className="design__illustration-image" />
          </div>

          <div data-text="Los amantes" className="glass">
            <img src={roma} className="design__illustration-image" />
          </div>
        </div>

        <div className="container">
          <div data-text="Vida en las montañas" className="glass">
            <img src={suiza1} className="design__illustration-image" />
          </div>
          <div data-text="Orange Autum" className="glass">
            <img src={suiza2} className="design__illustration-image" />
          </div>

          <div data-text="Crux Sacra" className="glass">
            <img src={capilla} className="design__illustration-image" />
          </div>
        </div>
      </StyledWrapperPhoto>
    </>
  );
};

const StyledWrapperPhoto = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    gap: 40px;
  }

  .container .glass {
    position: relative;
    width: 200px;
    height: 300px;
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

export default PhotohraphyCard;
