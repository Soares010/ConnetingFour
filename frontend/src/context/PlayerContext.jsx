import { createContext } from "react";
import { useCreatePlayerLogic } from "../hooks/useCreatePlayerLogic";

export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }) => {
  const useCreatePlayer = useCreatePlayerLogic();
  return (
    <PlayerContext.Provider value={useCreatePlayer}>
      {children}
    </PlayerContext.Provider>
  );
};
