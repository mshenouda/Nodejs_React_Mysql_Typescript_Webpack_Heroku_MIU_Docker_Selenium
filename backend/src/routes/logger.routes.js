"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_controller_1 = require("../controllers/logger.controller");
var LoggerRoutes = /** @class */ (function () {
    function LoggerRoutes() {
        this.router = (0, express_1.Router)();
        this.controller = new logger_controller_1.default();
        this.intializeRoutes();
    }
    LoggerRoutes.prototype.intializeRoutes = function () {
        // Create a new Logger
        this.router.post("/", this.controller.create);
        // Retrieve all Loggers
        this.router.get("/", this.controller.findAll);
        // Delete all Loggers
        this.router.delete("/", this.controller.deleteAll);
    };
    return LoggerRoutes;
}());
exports.default = new LoggerRoutes().router;
