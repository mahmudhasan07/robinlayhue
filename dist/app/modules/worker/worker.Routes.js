"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const worker_Controller_1 = require("./worker.Controller");
const uploadFile_1 = require("../../helper/uploadFile");
const parseBodyData_1 = require("../../middleware/parseBodyData");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const worker_Validation_1 = require("./worker.Validation");
const route = (0, express_1.Router)();
route.post("/create", (0, auth_1.default)(client_1.Role.ADMIN), uploadFile_1.fileUploader.uploadProfileImage, parseBodyData_1.parseBodyMiddleware, (0, validateRequest_1.default)(worker_Validation_1.WorkerValidation.createWorkerValidation), worker_Controller_1.workerController.createWorkerController);
route.get("/", (0, auth_1.default)(client_1.Role.ADMIN), worker_Controller_1.workerController.getAllWorkerController);
exports.workerRoutes = route;
