"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_controller_1 = __importDefault(require("../controllers/logger.controller"));
class LoggerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new logger_controller_1.default();
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
exports.default = new LoggerRoutes().router;
//# sourceMappingURL=logger.routes.js.map