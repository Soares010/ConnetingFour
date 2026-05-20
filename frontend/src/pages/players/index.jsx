import React, { useState } from "react";
import "../../assets/styles/Players.css";
import { useCreatePlayer } from "../../hooks/useCreatePlayer.js";
import { Toaster } from "react-hot-toast";

export default function PlayerSetup({ onStartJogo }) {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const { player, createPlayer } = useCreatePlayer();
  const handleStart = async (e) => {
    e.preventDefault();
    await createPlayer(playerOne, playerTwo);
  };

  return (
    <div className="game-container">
      <Toaster />
      <div className="setup-card">
        <div className="setup-header">
          <h1 className="setup-title">Identificação</h1>
          <p className="setup-subtitle">
            Insira o nome dos jogadores para iniciar.
          </p>
        </div>

        <form onSubmit={handleStart}>
          {/* Campo Jogador 1 */}
          <div className="input-group">
            <label className="input-label" htmlFor="p1">
              Jogador 01
            </label>
            <input
              id="p1"
              type="text"
              name="playerOne"
              className="custom-input"
              placeholder="Apelido ou Nome"
              value={playerOne}
              onChange={(e) => setPlayerOne(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          {/* Campo Jogador 2 */}
          <div className="input-group">
            <label className="input-label" htmlFor="p2">
              Jogador 02
            </label>
            <input
              id="p2"
              type="text"
              name="playerTwo"
              className="custom-input"
              placeholder="Apelido ou Nome"
              value={playerTwo}
              onChange={(e) => setPlayerTwo(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          {/* Botão original com a animação pulse */}
          <div className="button-container">
            <button type="submit" className="pulse-button">
              Iniciar Confronto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
