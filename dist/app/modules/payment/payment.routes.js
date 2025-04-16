"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const payment_controller_1 = require("./payment.controller");
const route = (0, express_1.Router)();
route.post('/create', (0, auth_1.default)(client_1.Role.USER), payment_controller_1.paymentController.createPaymentController);
route.post('/save-card', (0, auth_1.default)(client_1.Role.USER), payment_controller_1.paymentController.saveCardController);
route.get('/get-card', (0, auth_1.default)(client_1.Role.USER), payment_controller_1.paymentController.getSaveCardController);
route.delete('/delete-card', (0, auth_1.default)(client_1.Role.USER), payment_controller_1.paymentController.deleteCardController);
exports.paymentRoutes = route;
