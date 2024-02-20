"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./src/index"));
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config({ path: path_1.default.join(__dirname, '../../../.env') });
}
const app = (0, express_1.default)();
const server = new index_1.default(app);
const HOST = process.env.HOST;
let PORT;
if (process.env.NODE_ENV === 'production')
    PORT = parseInt(process.env.PORT, 10);
else
    PORT = process.env.REACT_APP_SERVER_PORT ? parseInt(process.env.REACT_APP_SERVER_PORT, 10) : 8082;
app
    .listen(PORT, HOST, () => {
    console.log(`Server is running on HOST:${HOST} PORT:${PORT} MODE:${process.env.NODE_ENV}.`);
})
    .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
//# sourceMappingURL=server.js.map