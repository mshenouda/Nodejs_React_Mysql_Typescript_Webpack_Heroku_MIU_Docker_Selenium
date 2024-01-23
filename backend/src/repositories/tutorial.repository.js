"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var TutorialRepository = /** @class */ (function () {
    function TutorialRepository() {
    }
    TutorialRepository.prototype.save = function (tutorial) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            db_1.default.query("INSERT INTO tutorials (title, description, published) VALUES(?,?,?)", [tutorial.title, tutorial.description, tutorial.published ? tutorial.published : false], function (err, res) {
                if (err)
                    reject(err);
                else
                    _this.retrieveById(res.insertId)
                        .then(function (tutorial) { return resolve(tutorial); })
                        .catch(reject);
            });
        });
    };
    TutorialRepository.prototype.retrieveAll = function (searchParams) {
        var query = "SELECT * FROM tutorials";
        var condition = "";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.published)
            condition += "published = TRUE";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.title)
            condition += "LOWER(title) LIKE '%".concat(searchParams.title, "%'");
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
    TutorialRepository.prototype.retrieveById = function (tutorialId) {
        return new Promise(function (resolve, reject) {
            db_1.default.query("SELECT * FROM tutorials WHERE id = ?", [tutorialId], function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    };
    TutorialRepository.prototype.update = function (tutorial) {
        return new Promise(function (resolve, reject) {
            db_1.default.query("UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?", [tutorial.title, tutorial.description, tutorial.published, tutorial.id], function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    };
    TutorialRepository.prototype.delete = function (tutorialId) {
        return new Promise(function (resolve, reject) {
            db_1.default.query("DELETE FROM tutorials WHERE id = ?", [tutorialId], function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    };
    TutorialRepository.prototype.deleteAll = function () {
        return new Promise(function (resolve, reject) {
            db_1.default.query("DELETE FROM tutorials", function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    };
    return TutorialRepository;
}());
exports.default = new TutorialRepository();
