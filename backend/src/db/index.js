"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = require("mysql2");
var db_config_1 = require("../config/db.config");
exports.default = mysql2_1.default.createConnection({
    host: db_config_1.default.HOST,
    user: db_config_1.default.USER,
    password: db_config_1.default.PASSWORD,
    database: db_config_1.default.DB,
});
