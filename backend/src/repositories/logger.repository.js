"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var LoggerRepository = /** @class */ (function () {
    function LoggerRepository() {
    }
    LoggerRepository.prototype.save = function (logger) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            db_1.default.query("INSERT INTO loggers (level, func, message) VALUES(?,?,?)", [logger.level, logger.func, logger.message], function (err, res) {
                if (err)
                    reject(err);
                else
                    _this.retrieveById(res.insertId)
                        .then(function (logger) { return resolve(logger); })
                        .catch(reject);
            });
        });
    };
    LoggerRepository.prototype.retrieveById = function (loggerId) {
        return new Promise(function (resolve, reject) {
            db_1.default.query("SELECT * FROM loggers WHERE id = ?", [loggerId], function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    };
    LoggerRepository.prototype.retrieveAll = function (searchParams) {
        var query = "SELECT * FROM loggers";
        var condition = "";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.func)
            condition += "func = TRUE";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.level)
            condition += "LOWER(level) LIKE '%".concat(searchParams.level, "%'");
        if (condition.length)
            query += " WHERE " + condition;
        return new Promise(function (resolve, reject) {
            db_1.default.query(query, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    LoggerRepository.prototype.deleteAll = function () {
        return new Promise(function (resolve, reject) {
            db_1.default.query("DELETE FROM loggers", function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    };
    return LoggerRepository;
}());
exports.default = new LoggerRepository();
