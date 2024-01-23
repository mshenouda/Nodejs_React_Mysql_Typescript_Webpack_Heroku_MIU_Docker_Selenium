"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tutorial_routes_1 = require("./tutorial.routes");
var home_routes_1 = require("./home.routes");
var index_routes_1 = require("./index.routes");
var logger_routes_1 = require("./logger.routes");
var user_routes_1 = require("./user.routes");
var Routes = /** @class */ (function () {
    function Routes(app) {
        app.use("/", index_routes_1.default);
        app.use("/api", home_routes_1.default);
        app.use("/api/tutorials", tutorial_routes_1.default);
        app.use("/api/loggers", logger_routes_1.default);
        app.use("/api/users", user_routes_1.default);
    }
    return Routes;
}());
exports.default = Routes;
