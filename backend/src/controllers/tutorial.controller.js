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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tutorial_repository_1 = require("../repositories/tutorial.repository");
var TutorialController = /** @class */ (function () {
    function TutorialController() {
    }
    TutorialController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tutorial, savedTutorial, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body.title) {
                            res.status(400).send({
                                message: "Content can not be empty!"
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        tutorial = req.body;
                        return [4 /*yield*/, tutorial_repository_1.default.save(tutorial)];
                    case 2:
                        savedTutorial = _a.sent();
                        res.status(201).send(savedTutorial);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).send({
                            message: "Some error occurred while retrieving tutorials."
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TutorialController.prototype.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var title, tutorials, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = typeof req.query.title === "string" ? req.query.title : "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tutorial_repository_1.default.retrieveAll({ title: title })];
                    case 2:
                        tutorials = _a.sent();
                        res.status(200).send(tutorials);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.status(500).send({
                            message: "Some error occurred while retrieving tutorials."
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TutorialController.prototype.findOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, tutorial, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tutorial_repository_1.default.retrieveById(id)];
                    case 2:
                        tutorial = _a.sent();
                        if (tutorial)
                            res.status(200).send(tutorial);
                        else
                            res.status(404).send({
                                message: "Cannot find Tutorial with id=".concat(id, ".")
                            });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        res.status(500).send({
                            message: "Error retrieving Tutorial with id=".concat(id, ".")
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TutorialController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tutorial, num, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tutorial = req.body;
                        tutorial.id = parseInt(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tutorial_repository_1.default.update(tutorial)];
                    case 2:
                        num = _a.sent();
                        if (num == 1) {
                            res.send({
                                message: "Tutorial was updated successfully."
                            });
                        }
                        else {
                            res.send({
                                message: "Cannot update Tutorial with id=".concat(tutorial.id, ". Maybe Tutorial was not found or req.body is empty!")
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        res.status(500).send({
                            message: "Error updating Tutorial with id=".concat(tutorial.id, ".")
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TutorialController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, num, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tutorial_repository_1.default.delete(id)];
                    case 2:
                        num = _a.sent();
                        if (num == 1) {
                            res.send({
                                message: "Tutorial was deleted successfully!"
                            });
                        }
                        else {
                            res.send({
                                message: "Cannot delete Tutorial with id=".concat(id, ". Maybe Tutorial was not found!"),
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        res.status(500).send({
                            message: "Could not delete Tutorial with id==".concat(id, ".")
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TutorialController.prototype.deleteAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var num, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, tutorial_repository_1.default.deleteAll()];
                    case 1:
                        num = _a.sent();
                        res.send({ message: "".concat(num, " Tutorials were deleted successfully!") });
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.status(500).send({
                            message: "Some error occurred while removing all tutorials."
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TutorialController.prototype.findAllPublished = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tutorials, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, tutorial_repository_1.default.retrieveAll({ published: true })];
                    case 1:
                        tutorials = _a.sent();
                        res.status(200).send(tutorials);
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        res.status(500).send({
                            message: "Some error occurred while retrieving tutorials."
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TutorialController;
}());
exports.default = TutorialController;
