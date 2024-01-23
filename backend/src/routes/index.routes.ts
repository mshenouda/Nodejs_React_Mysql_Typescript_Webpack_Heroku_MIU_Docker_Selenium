import { Router } from "express";
import IndexController from "../controllers/index.controller";

class IndexRoutes {
    router = Router();
    controller = new IndexController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", this.controller.create);
    }
}

export default new IndexRoutes().router;



