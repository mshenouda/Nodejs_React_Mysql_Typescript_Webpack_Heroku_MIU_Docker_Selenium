"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_controller_1 = require("../controllers/index.controller");
var IndexRoutes = /** @class */ (function () {
    function IndexRoutes() {
        this.router = (0, express_1.Router)();
        this.controller = new index_controller_1.default();
        this.intializeRoutes();
    }
    IndexRoutes.prototype.intializeRoutes = function () {
        //this.router.get("/", this.controller.create);
        this.router.get("/", this.controller.helloWorld);
        // this.router.get("/", this.controller.describe);
    };
    return IndexRoutes;
}());
exports.default = new IndexRoutes().router;
