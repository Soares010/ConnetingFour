import cors from "cors";
import helmet from "helmet";
import express from "express";
import router from "../routes/router.js";
import { origins } from "../middlewares/CheckOrigin.js";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(helmet());
//     this.server.use(globalLimiter);
    this.server.use(cors(origins()));
    this.server.use(express.json({ limit: "20kb" }));
  }

  routes() {
    this.server.use(router);
  }
}

export default new App().server;
