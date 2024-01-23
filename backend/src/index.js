"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var routes_1 = require("./routes");
var http = require("http");
var Server = /** @class */ (function () {
    function Server(app) {
        this.config(app);
        new routes_1.default(app);
    }
    Server.prototype.config = function (app) {
        var corsOptions = {
            origin: "http://localhost:3000"
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
    };
    return Server;
}());
exports.default = Server;
