import { Request, Response } from "express";
import Logger from "../models/logger.model";
import loggerRepository from "../repositories/logger.repository";

export default class LoggerController {
  async create(req: Request, res: Response) {
    if (!req.body.level) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const logger: Logger = req.body;
      const savedLogger = await loggerRepository.save(logger);

      res.status(201).send(savedLogger);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving loggers."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const level = typeof req.query.level === "string" ? req.query.level : "";
    const func = typeof req.query.func === "string" ? req.query.func : "";

    try {
      const loggers = await loggerRepository.retrieveAll({ level: level, func: func });

      res.status(200).send(loggers);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving loggers."
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await loggerRepository.deleteAll();

      res.send({ message: `${num} Loggers were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all loggers."
      });
    }
  }
}
