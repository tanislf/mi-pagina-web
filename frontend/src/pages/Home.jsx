import { Link } from "react-router-dom";
import SplitText from "../components/Animations/Splitext";

function Home() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <section className="home">
      <h1 className="home__title">
        <SplitText
          text="Diseñadora"
          className="split-text split-text_design"
          delay={100}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: -40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        <SplitText
          text="& fotógrafa."
          className="split-text"
          delay={100}
          from={{ opacity: 0, x: -40 }}
          to={{ opacity: 1, x: 0 }}
          staggeDirection={-1}
        />
      </h1>

      <p className="home__subtitle">Si puedes soñarlo puedes crearlo.</p>

      <div className="home__buttons">
        <Link to="/design" className="home__link-button">
          <button className="home__button home__button_design">
            Necesito un diseñador
          </button>
        </Link>
        <Link to="/photography" className="home__link-button">
          <button className="home__button">Necesito un fotógrafo</button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
