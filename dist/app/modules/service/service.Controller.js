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
exports.ServiceController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const service_Service_1 = require("./service.Service");
const sendResponse_1 = __importDefault(require("../../middleware/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const image = req.file;
    const result = yield service_Service_1.serviceServices.createServiceIntoDB(body, image);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, message: "Service created successfully", data: result, success: true });
}));
const getAllServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.query.review;
    const result = yield service_Service_1.serviceServices.getAllServiceFromDB(review);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "All services", data: result, success: true });
}));
const getSingleServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_Service_1.serviceServices.getSingleServiceFromDB(id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Single service", data: result, success: true });
}));
const updateServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const image = req.file;
    const result = yield service_Service_1.serviceServices.updateServiceIntoDB(id, body, image);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, message: "Service created successfully", data: result, success: true });
}));
const deleteServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_Service_1.serviceServices.deleteServiceFromDB(id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Service deleted successfully", data: result, success: true });
}));
const searchServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const result = yield service_Service_1.serviceServices.searchServiceFromDB(name);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Service found successfully", data: result, success: true });
}));
exports.ServiceController = { createServiceController, getAllServiceController, getSingleServiceController, updateServiceController, deleteServiceController, searchServiceController };
