"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_repository_1 = __importDefault(require("../repositories/logger.repository"));
class LoggerController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.level) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const logger = req.body;
                const savedLogger = yield logger_repository_1.default.save(logger);
                res.status(201).send(savedLogger);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving loggers."
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = typeof req.query.level === "string" ? req.query.level : "";
            const func = typeof req.query.func === "string" ? req.query.func : "";
            try {
                const loggers = yield logger_repository_1.default.retrieveAll({ level: level, func: func });
                res.status(200).send(loggers);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving loggers."
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const num = yield logger_repository_1.default.deleteAll();
                res.send({ message: `${num} Loggers were deleted successfully!` });
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while removing all loggers."
                });
            }
        });
    }
}
exports.default = LoggerController;
//# sourceMappingURL=logger.controller.js.map