import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";
import homeRoutes from "./home.routes";
import loggerRoutes from "./logger.routes";
import userRoutes from "./user.routes";
import {welcome} from '../controllers/bogger.controller';

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/tutorials", tutorialRoutes);
    app.use("/api/loggers", loggerRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/boggers", welcome);
  }
}
