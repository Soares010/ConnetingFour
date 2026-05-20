import { Router } from "express";
// CONTROLLERS
import PlayerController from "../controllers/PlayerController.js";
import GameController from "../controllers/GameController.js";

// MIDDLEWARES

const router = new Router();

router.post("/players", PlayerController.createPlayer);
router.post("/finish", GameController.finish);

export default router;
