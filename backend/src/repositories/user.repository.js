"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.save = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            db_1.default.query("INSERT INTO users (email, password) VALUES(?,?)", [user.email, user.password ? user.password : false], function (err, res) {
                if (err)
                    reject(err);
                else
                    _this.retrieveById(res.insertId)
                        .then(function (user) { return resolve(user); })
                        .catch(reject);
            });
        });
    };
    UserRepository.prototype.retrieveByEmail = function (searchParams) {
        var query = "SELECT * FROM users";
        var condition = "";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.email)
            condition += "LOWER(email) LIKE '%".concat(searchParams.email, "%' AND ");
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.password)
            condition += "password LIKE '%".concat(searchParams.password, "%'");
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
    UserRepository.prototype.retrieveAll = function () {
        var query = "SELECT * FROM users";
        return new Promise(function (resolve, reject) {
            db_1.default.query(query, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    };
    UserRepository.prototype.retrieveById = function (userId) {
        return new Promise(function (resolve, reject) {
            db_1.default.query("SELECT * FROM users WHERE id = ?", [userId], function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    };
    UserRepository.prototype.delete = function (userId) {
        return new Promise(function (resolve, reject) {
            db_1.default.query("DELETE FROM users WHERE id = ?", [userId], function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    };
    UserRepository.prototype.deleteAll = function () {
        return new Promise(function (resolve, reject) {
            db_1.default.query("DELETE FROM users", function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    };
    return UserRepository;
}());
exports.default = new UserRepository();
