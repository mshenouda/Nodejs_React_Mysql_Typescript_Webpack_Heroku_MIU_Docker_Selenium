import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
    router = Router();
    controller = new UserController();

    constructor() {
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

export default new UserRoutes().router;

