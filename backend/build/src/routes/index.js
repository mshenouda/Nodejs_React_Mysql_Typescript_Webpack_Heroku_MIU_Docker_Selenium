"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tutorial_routes_1 = __importDefault(require("./tutorial.routes"));
const home_routes_1 = __importDefault(require("./home.routes"));
const logger_routes_1 = __importDefault(require("./logger.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
class Routes {
    constructor(app) {
        app.use("/", home_routes_1.default);
        app.use("/api/tutorials", tutorial_routes_1.default);
        app.use("/api/loggers", logger_routes_1.default);
        app.use("/api/users", user_routes_1.default);
    }
}
exports.default = Routes;
//# sourceMappingURL=index.js.map