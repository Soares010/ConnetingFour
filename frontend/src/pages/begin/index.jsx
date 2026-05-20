import "../../assets/styles/BeginGame.css";
import { Link } from "react-router-dom";

export default function BeginGame() {
  return (
    <>
      <div className="game-container">
        <div>
          <Link to="/players" className="pulse-button">
            Começar Jogo
          </Link>
        </div>
      </div>
    </>
  );
}
