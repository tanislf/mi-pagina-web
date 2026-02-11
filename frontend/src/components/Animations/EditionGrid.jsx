import styled from "styled-components";
import hogwarts from "../../images/hogwarts.webp";
import mario from "../../images/mario.webp";
import castillo from "../../images/castillo.webp";
import dracula from "../../images/dracula.webp";
import ejecutor from "../../images/ejecutor.webp";
import hollywood from "../../images/hollywood.webp";

const EditionCard = () => {
  return (
    <>
      <StyledWrapperEdition>
        <div className="container">
          <div data-text="Hogwarts" className="glass">
            <img src={hogwarts} className="design__illustration-image" />
          </div>
          <div data-text="Super Mario World" className="glass">
            <img src={mario} className="design__illustration-image" />
          </div>

          <div data-text="City of stars" className="glass">
            <img src={hollywood} className="design__illustration-image" />
          </div>
        </div>

        <div className="container">
          <div data-text="El Conde" className="glass">
            <img src={dracula} className="design__illustration-image" />
          </div>
          <div data-text="Verdugo" className="glass">
            <img src={ejecutor} className="design__illustration-image" />
          </div>

          <div data-text="Fary Tale" className="glass">
            <img src={castillo} className="design__illustration-image" />
          </div>
        </div>
      </StyledWrapperEdition>
    </>
  );
};

const StyledWrapperEdition = styled.div`
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

export default EditionCard;
