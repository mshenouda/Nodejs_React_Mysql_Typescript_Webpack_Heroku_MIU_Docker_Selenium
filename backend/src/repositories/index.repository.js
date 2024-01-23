"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var IndexRepository = /** @class */ (function () {
    function IndexRepository() {
    }
    IndexRepository.prototype.create = function (tableName) {
        var _this = this;
        // Query to create table 
        var query = "CREATE TABLE IF NOT EXISTS ".concat(tableName, " (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(10) NOT NULL, description VARCHAR(12) NOT NULL, published BOOLEAN NULL)");
        return new Promise(function (resolve, reject) {
            db_1.default.query(query, [], function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(_this.describe(tableName));
                    // this.describe(table)
                    //     .then(res => console.log(res))
                    //     .catch(reject);
                    // //resolve(res);
                }
            });
        });
    };
    IndexRepository.prototype.describe = function (tableName) {
        return new Promise(function (reject, resolve) {
            var query = "DESCRIBE tutorials";
            db_1.default.query(query, [], function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    };
    return IndexRepository;
}());
exports.default = new IndexRepository();
