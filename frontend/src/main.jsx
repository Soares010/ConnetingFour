import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigation,
} from "react-router-dom";
import "./assets/styles/index.css";
import Game from "./pages/game/index";
import BeginGame from "./pages/begin/index";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import PlayerSetup from "./pages/players";
import { PlayerProvider } from "./context/PlayerContext";

const simularAtraso = (ms = 2000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Loader genérico para aplicar o atraso nas rotas desejadas
const carregarComAtraso = async () => {
  await simularAtraso(2000); // Garante os 2s de processamento simulado
  return null;
};

function AppLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    // Se o estado for "loading", a internet está buscando a rota. Iniciamos a barra.
    if (navigation.state === "loading") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);
  return (
    <PlayerProvider>
      <Outlet />
    </PlayerProvider>
  );
}

// 2. Colocamos o AppLayout como a rota pai de todas as outras
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Garante que os hooks de rota funcionem nos Contextos
    children: [
      { path: "/", element: <BeginGame />, loader: carregarComAtraso },
      { path: "/players", element: <PlayerSetup />, loader: carregarComAtraso },
      { path: "game", element: <Game />, loader: carregarComAtraso },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Agora o RouterProvider fica limpo na raiz */}
    <RouterProvider router={router} />
  </StrictMode>,
);
