"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.default();
        this.intializeRoutes();
    }
    UserRoutes.prototype.intializeRoutes = function () {
        //Create a new current User
        this.router.post("/register", this.controller.create);
        // Authenicate current User
        this.router.post("/", this.controller.login);
        // Retrieve all Users
        this.router.get("/", this.controller.findAll);
        // Retrieve a single User with id
        this.router.get("/:id", this.controller.findOne);
        // Delete a User with id
        this.router.delete("/:id", this.controller.delete);
        // Delete all Users
        this.router.delete("/", this.controller.deleteAll);
    };
    return UserRoutes;
}());
exports.default = new UserRoutes().router;
