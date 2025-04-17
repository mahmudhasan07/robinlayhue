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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prisma_1 = require("../../../utils/prisma");
const createReviewInDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield prisma_1.prisma.review.create({
        data: Object.assign(Object.assign({}, payload), { userId: userId })
    });
    return result;
});
const getAllReviewFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.review.findMany({});
    return result;
});
const getSingleReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.review.findUnique({
        where: {
            id
        }
    });
    return result;
});
exports.ReviewService = { createReviewInDB, getAllReviewFromDB, getSingleReviewFromDB };
