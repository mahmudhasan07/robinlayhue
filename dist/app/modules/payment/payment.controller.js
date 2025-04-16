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
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const payment_service_1 = require("./payment.service");
const sendResponse_1 = __importDefault(require("../../middleware/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createPaymentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id: userId } = req.user;
    const result = yield payment_service_1.paymentService.createIntentInStripe(payload, userId);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, message: "Payment created successfully", data: result, success: true });
}));
const saveCardController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id: userId } = req.user;
    const result = yield payment_service_1.paymentService.saveCardInStripe(payload, userId);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, message: "Card saved successfully", data: result, success: true });
}));
const getSaveCardController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.user;
    const result = yield payment_service_1.paymentService.getSaveCardsFromStripe(userId);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Card saved successfully", data: result, success: true });
}));
const deleteCardController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id: userId } = req.user;
    const result = yield payment_service_1.paymentService.deleteCardFromStripe(userId, payload.last4);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Card deleted successfully", data: result, success: true });
}));
exports.paymentController = { createPaymentController, saveCardController, getSaveCardController, deleteCardController };
