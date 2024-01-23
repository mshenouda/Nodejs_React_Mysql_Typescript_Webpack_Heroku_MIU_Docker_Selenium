import { OkPacket } from "mysql2";
import {connection} from "../db/index";
import ILogger from "../models/logger.model";

interface LoggerRepository {
  save(logger: ILogger): Promise<ILogger>;
  retrieveAll(searchParams: {level: string, func: string}): Promise<ILogger[]>;
  deleteAll(): Promise<number>;
}

class LoggerRepository implements LoggerRepository {
  save(logger: ILogger): Promise<ILogger> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO loggers (level, func, message) VALUES(?,?,?)",
        [logger.level, logger.func, logger.message],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((logger) => resolve(logger!))
              .catch(reject);
        }
      );
    });
  }

  retrieveById(loggerId: number): Promise<ILogger> {
    return new Promise((resolve, reject) => {
      connection.query<ILogger[]>(
        "SELECT * FROM loggers WHERE id = ?",
        [loggerId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  retrieveAll(searchParams: {level?: string, func?: string}): Promise<ILogger[]> {
    let query: string = "SELECT * FROM loggers";
    let condition: string = "";

    if (searchParams?.func)
      condition += "func = TRUE"

    if (searchParams?.level)
      condition += `LOWER(level) LIKE '%${searchParams.level}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<ILogger[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM loggers", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new LoggerRepository();
