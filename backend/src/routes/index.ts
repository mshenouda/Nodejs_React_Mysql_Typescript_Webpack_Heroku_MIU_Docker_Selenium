import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";
import homeRoutes from "./home.routes";
import loggerRoutes from "./logger.routes";
import userRoutes from "./user.routes";


export default class Routes {
  constructor(app: Application) {
    app.use("/", homeRoutes);
    app.use("/api/tutorials", tutorialRoutes);
    app.use("/api/loggers", loggerRoutes);
    app.use("/api/users", userRoutes);
  }
}
