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
exports.serviceServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../utils/prisma");
const ApiErrors_1 = __importDefault(require("../../error/ApiErrors"));
const uploadFile_1 = require("../../helper/uploadFile");
const createServiceIntoDB = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrl = yield (0, uploadFile_1.getImageUrl)(image);
    const findService = yield prisma_1.prisma.service.findFirst({
        where: {
            name: payload.name
        }
    });
    if (findService) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Service already exists");
    }
    const result = yield prisma_1.prisma.service.create({
        data: Object.assign(Object.assign({}, payload), { image: imageUrl })
    });
    return result;
});
const getAllServiceFromDB = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.service.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            Review: true
        }
    });
    const formattedResult = result.map((item) => {
        const avgReview = item.Review.reduce((acc, curr) => acc + curr.rating, 0);
        return {
            id: item.id,
            name: item.name,
            image: item.image,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            Review: avgReview
        };
    });
    if (review) {
        const sortedResult = formattedResult.filter((item) => item.Review >= 1);
        return sortedResult;
    }
    return formattedResult;
});
const getSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.service.findUnique({
        where: {
            id
        },
        include: {
            Review: true
        }
    });
    return result;
});
const updateServiceIntoDB = (id, payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrl = image && (yield (0, uploadFile_1.getImageUrl)(image));
    try {
        const result = yield prisma_1.prisma.service.update({
            where: {
                id
            },
            data: Object.assign(Object.assign({}, payload), { image: imageUrl !== null && imageUrl !== void 0 ? imageUrl : undefined })
        });
        return result;
    }
    catch (_a) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Service not found");
    }
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.service.delete({
            where: {
                id
            }
        });
        return result;
    }
    catch (_a) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Service not found");
    }
});
const searchServiceFromDB = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.service.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        }
    });
    return result;
});
exports.serviceServices = { createServiceIntoDB, getAllServiceFromDB, getSingleServiceFromDB, updateServiceIntoDB, deleteServiceFromDB, searchServiceFromDB };
