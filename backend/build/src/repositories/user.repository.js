"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../db/index");
class UserRepository {
    save(user) {
        return new Promise((resolve, reject) => {
            index_1.connection.query(`INSERT INTO users (userName, password) VALUES(?,?)`, [user.userName, user.password ? user.password : false], (err, res) => {
                if (err)
                    reject(err);
                else
                    this.retrieveById(res.insertId)
                        .then((user) => resolve(user))
                        .catch(reject);
            });
        });
    }
    retrieveByUserName(searchParams) {
        let query = `SELECT * FROM users`;
        let condition = "";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.userName)
            condition += `LOWER(userName) LIKE '%${searchParams.userName}%' AND `;
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.password)
            condition += `password LIKE '%${searchParams.password}%'`;
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
    retrieveAll() {
        let query = `SELECT * FROM users`;
        return new Promise((resolve, reject) => {
            index_1.connection.query(query, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }
    retrieveById(userId) {
        return new Promise((resolve, reject) => {
            index_1.connection.query(`SELECT * FROM users WHERE id = ?`, [userId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    }
    delete(userId) {
        return new Promise((resolve, reject) => {
            index_1.connection.query("DELETE FROM users WHERE id = ?", [userId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            index_1.connection.query("DELETE FROM users", (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
}
exports.default = new UserRepository();
//# sourceMappingURL=user.repository.js.map