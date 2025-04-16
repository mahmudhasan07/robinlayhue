"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const review_Controller_1 = require("./review.Controller");
const route = (0, express_1.Router)();
route.post('/create', (0, auth_1.default)(client_1.Role.USER), review_Controller_1.ReviewController.createReviewController);
route.get('/', (0, auth_1.default)(client_1.Role.USER), review_Controller_1.ReviewController.getAllReviewController);
route.get('/:id', (0, auth_1.default)(client_1.Role.USER), review_Controller_1.ReviewController.getSingleReviewController);
exports.reviewRoutes = route;
