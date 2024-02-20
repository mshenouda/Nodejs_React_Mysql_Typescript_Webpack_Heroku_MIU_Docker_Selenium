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
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.userName) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const user = req.body;
                const savedUser = yield user_repository_1.default.save(user);
                res.status(201).send(savedUser);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving users."
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.userName) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            const userName = req.body.userName;
            const password = req.body.password;
            try {
                const savedUser = yield user_repository_1.default.retrieveByUserName({ userName: userName, password: password });
                res.status(201).send(savedUser);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving users."
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_repository_1.default.retrieveAll();
                res.status(200).send(users);
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving users."
                });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const user = yield user_repository_1.default.retrieveById(id);
                if (user)
                    res.status(200).send(user);
                else
                    res.status(404).send({
                        message: `Cannot find User with id=${id}.`
                    });
            }
            catch (err) {
                res.status(500).send({
                    message: `Error retrieving User with id=${id}.`
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const num = yield user_repository_1.default.delete(id);
                if (num == 1) {
                    res.send({
                        message: "User was deleted successfully!"
                    });
                }
                else {
                    res.send({
                        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                    });
                }
            }
            catch (err) {
                res.status(500).send({
                    message: `Could not delete User with id==${id}.`
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const num = yield user_repository_1.default.deleteAll();
                res.send({ message: `${num} Users were deleted successfully!` });
            }
            catch (err) {
                res.status(500).send({
                    message: "Some error occurred while removing all users."
                });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map