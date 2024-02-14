"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const http = require("http");
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config({ path: path_1.default.join(__dirname, '../../../.env') });
}
class Server {
    constructor(app) {
        this.config(app);
        new routes_1.default(app);
    }
    config(app) {
        const corsOptions = {
            origin: `http://${process.env.HOST}:${process.env.REACT_PORT}`
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use(body_parser_1.default.json({ type: 'application/*+json' }));
        app.use(body_parser_1.default.text({ type: 'text/html' }));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
    }
}
exports.default = Server;
//# sourceMappingURL=index.js.map