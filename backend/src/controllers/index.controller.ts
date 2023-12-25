import { Request, Response } from "express";
import indexRepository from "../repositories/index.repository";

export default class IndexController {
    async create(req: Request, res: Response) {
        let tableName: string = "";
        try {
            tableName = req.body.tableName;
            console.log("table Name", tableName);
            await indexRepository.create(tableName);
            res.status(201).send(`Successfully created table ${tableName}`);
        } catch (err) {
            res.status(500).send({
                message: `Some error occurred while creating table ${tableName}`,
                error: err
            });
        }
    }

    helloWorld(req: Request, res: Response): Response {
        return res.json({ message: "Hello World" });
    }

    async describe(req: Request, res: Response) {
        let table: string = "";
        try {
            await indexRepository.describe("tutorials");
            res.status(201).send("successfully retrieved");
        } catch (err) {
            res.status(500).send({
                message: `Some error occurred while creating table.`,
                myErr: err,
            });
        }
    }
}