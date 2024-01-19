import { Router } from "express";
import LoggerController from "../controllers/logger.controller";

class LoggerRoutes {
  router = Router();
  controller = new LoggerController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Logger
    this.router.post("/", this.controller.create);

    // Retrieve all Loggers
    this.router.get("/", this.controller.findAll);

    // Delete all Loggers
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new LoggerRoutes().router;
