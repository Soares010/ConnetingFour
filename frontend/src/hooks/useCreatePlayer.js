import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const useCreatePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer deve ser usado com um provider");
  }

  return context;
};
