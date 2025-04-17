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
exports.bookingController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../middleware/sendResponse"));
const booking_service_1 = require("./booking.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const createBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const payload = req.body;
    const result = yield booking_service_1.bookingService.createBooking(payload, id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, message: "Booking created successfully", data: result, success: true });
}));
const getAllBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingService.getAllBookingByStatus({ status: req.query.status });
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Booking fetched successfully", data: result, success: true });
}));
const myBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield booking_service_1.bookingService.getMyBookingService(id);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Booking fetched successfully", data: result, success: true });
}));
const assignBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield booking_service_1.bookingService.assignServiceToBooking(payload);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Booking updated successfully", data: result, success: true });
}));
const completeBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = yield booking_service_1.bookingService.completeBooking(id, userId);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, message: "Booking completed successfully", data: result, success: true });
}));
exports.bookingController = { createBookingController, getAllBookingController, myBookingController, assignBookingController, completeBookingController };
