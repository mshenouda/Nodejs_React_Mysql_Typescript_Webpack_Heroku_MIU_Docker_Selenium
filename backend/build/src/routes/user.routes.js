"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
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
    }
}
exports.default = new UserRoutes().router;
//# sourceMappingURL=user.routes.js.map