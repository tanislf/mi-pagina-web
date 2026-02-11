import styled from "styled-components";
import meCartoon from "../../images/mecartoon.webp";
import hype from "../../images/hype.webp";
import cyberboy from "../../images/cyberboy.webp";
import smoker from "../../images/smoker.webp";
import billie from "../../images/billie.webp";
import eiw2 from "../../images/eiw2.webp";

const IllustrationCard = () => {
  return (
    <>
      <StyledWrapper>
        <div className="container">
          <div data-text="Smoker" className="glass">
            <img src={smoker} className="design__illustration-image" />
          </div>
          <div data-text="Hype" className="glass">
            <img src={hype} className="design__illustration-image" />
          </div>

          <div data-text="Cyberboy" className="glass">
            <img src={cyberboy} className="design__illustration-image" />
          </div>
        </div>

        <div className="container">
          <div data-text="La Tanis" className="glass">
            <img src={meCartoon} className="design__illustration-image" />
          </div>
          <div data-text="Everything I wanted" className="glass">
            <img src={eiw2} className="design__illustration-image" />
          </div>

          <div data-text="Billie" className="glass">
            <img src={billie} className="design__illustration-image" />
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    gap: 20px;
  }

  .container .glass {
    position: relative;
    width: 200px;
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

export default IllustrationCard;
