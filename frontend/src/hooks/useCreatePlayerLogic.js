import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";
import { useCallback } from "react";
import { validate } from "../utils/validator.js";
import { Notifications } from "../utils/Notifications.jsx";
import { errors } from "../utils/errors.js";
import { useNavigate } from "react-router-dom";

export const useCreatePlayerLogic = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    Notifications({
      type: "success",
      message: success,
      configMessage: setSuccess,
    });
    Notifications({
      type: "error",
      message: error,
      configMessage: setError,
    });
  }, [success, error]);

  const createPlayer = useCallback(async (playerOne, playerTwo) => {
    const required = ["playerOne", "playerTwo"];

    const errorMessage = validate(required, { playerOne, playerTwo });

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const response = await api.post("/players", {
        playerOne,
        playerTwo,
      });
      const { player } = response.data;
      setPlayer(player);
      localStorage.setItem(
        "game",
        JSON.stringify({
          player,
        }),
      );
      setSuccess(response.data.message);
      console.log(response.data);
      navigate("/game");
    } catch (error) {
      console.log(error.message);
      errors(error, setError);
    }
  }, []);

  const finishGame = useCallback(async (winnerName, gameId, isDraw) => {
    try {
      const response = await api.post("/finish", {
        winnerName,
        gameId,
        isDraw,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error, setError);
    }
  }, []);

  return {
    player,
	  createPlayer,
    finishGame
  };
};
