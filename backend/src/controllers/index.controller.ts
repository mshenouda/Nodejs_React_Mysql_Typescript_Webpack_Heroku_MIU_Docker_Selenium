import { Request, Response } from "express";
import indexRepository from "../repositories/index.repository";
import {dbname } from '../constants';

export default class IndexController {
    async create(req: Request, res: Response) {
        try {
            await indexRepository.create(dbname);
            res.status(201).send(`Successfully created database ${dbname}`);
        } catch (err) {
            res.status(500).send({
                message: `Some error occurred while creating database ${dbname}`,
                error: err,
            });
        }
    }

    async describe(req: Request, res: Response) {
        try {
            await indexRepository.describe(dbname);
            res.status(201).send("successfully retrieved");
        } catch (err) {
            res.status(500).send({
                message: `Some error occurred while creating database.`,
                error: err,
            });
        }
    }
}