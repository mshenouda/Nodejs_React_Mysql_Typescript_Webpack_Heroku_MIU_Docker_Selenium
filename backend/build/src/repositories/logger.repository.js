"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../db/index");
class LoggerRepository {
    save(logger) {
        return new Promise((resolve, reject) => {
            index_1.connection.query("INSERT INTO loggers (level, func, message) VALUES(?,?,?)", [logger.level, logger.func, logger.message], (err, res) => {
                if (err)
                    reject(err);
                else
                    this.retrieveById(res.insertId)
                        .then((logger) => resolve(logger))
                        .catch(reject);
            });
        });
    }
    retrieveById(loggerId) {
        return new Promise((resolve, reject) => {
            index_1.connection.query("SELECT * FROM loggers WHERE id = ?", [loggerId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    }
    retrieveAll(searchParams) {
        let query = "SELECT * FROM loggers";
        let condition = "";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.func)
            condition += "func = TRUE";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.level)
            condition += `LOWER(level) LIKE '%${searchParams.level}%'`;
        if (condition.length)
            query += " WHERE " + condition;
        return new Promise((resolve, reject) => {
            index_1.connection.query(query, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            index_1.connection.query("DELETE FROM loggers", (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
}
exports.default = new LoggerRepository();
//# sourceMappingURL=logger.repository.js.map