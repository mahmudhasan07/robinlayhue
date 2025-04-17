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
exports.workerService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../utils/prisma");
const uploadFile_1 = require("../../helper/uploadFile");
const ApiErrors_1 = __importDefault(require("../../error/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = require("bcrypt");
const createWorker = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrl = file && (yield (0, uploadFile_1.getImageUrl)(file));
    const findUser = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (findUser) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User already exists");
    }
    const pass = yield (0, bcrypt_1.hash)(payload.password, 10);
    const result = yield prisma_1.prisma.user.create({
        data: Object.assign(Object.assign({}, payload), { isVerified: true, status: "ACTIVE", password: pass, role: client_1.Role.WORKER, image: imageUrl })
    });
    return result;
});
const getAllWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findMany({
        where: {
            role: "WORKER"
        },
        select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
exports.workerService = { createWorker, getAllWorker };
