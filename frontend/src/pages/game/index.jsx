import { useState } from "react";
import {
  dropPieces,
  resetGame,
  getPlayerColor,
} from "../../utils/gameConfigs.js";
import { useCreatePlayer } from "../../hooks/useCreatePlayer.js";

export default function Home() {
  const gameData = JSON.parse(localStorage.getItem("game"));
  console.log(gameData);

  const playerOne = gameData?.player?.playerOne;
  const playerTwo = gameData?.player?.playerTwo;
  const id = gameData?.player.game?.id;

  const ROWS = 6;
  const COLUMNS = 7;

  const createBoard = () =>
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(null));

  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const { finishGame } = useCreatePlayer();
  const [board, setBoard] = useState(createBoard());
  console.log(gameOver);

  const [currentPlayer, setCurrentPlayer] = useState(playerOne);

  return (
    <div className="container">
      <h2
        className={`status-title ${
          gameOver ? (winner ? `winner-${winner.toLowerCase()}` : "draw") : ""
        }`}
      >
        {gameOver
          ? winner
            ? `Vencedor: ${winner}`
            : "Empate!"
          : `Jogador Actual: ${currentPlayer}`}
      </h2>

      {/* PLAYERS */}
      <p className="vs">
        {playerOne} vs {playerTwo}
      </p>

      {/* BOARD */}
      <div className="board">
        {board.map((rows, row) =>
          rows.map((cell, col) => (
            <div
              key={`${row}-${col}`}
              className="cell"
              onClick={() =>
			  dropPieces(
			    id,
                  col,
                  board,
                  ROWS,
                  COLUMNS,
                  setCurrentPlayer,
                  setWinner,
                  setGameOver,
                  gameOver,
                  currentPlayer,
                  setBoard,
                  playerOne,
                  playerTwo,
                  finishGame,
                )
              }
            >
              <div
                className={`piece ${getPlayerColor(
                  cell,
                  playerOne,
                  playerTwo,
                )}`}
              />
            </div>
          )),
        )}
      </div>

      {/* RESET */}
      <button
        onClick={() =>
          resetGame(
            setBoard,
            setCurrentPlayer,
            setGameOver,
            setWinner,
            createBoard,
            playerOne,
          )
        }
      >
        Reiniciar
      </button>
    </div>
  );
}
