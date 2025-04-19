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
exports.bookingService = void 0;
const prisma_1 = require("../../../utils/prisma");
const ApiErrors_1 = __importDefault(require("../../error/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
const createBooking = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.booking.create({
        data: Object.assign(Object.assign({}, payload), { userId: id })
    });
    return result;
});
const getAllBookingByStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.booking.findMany({
        where: {
            status: payload.status
        },
        include: {
            userDetails: {
                select: {
                    name: true,
                    email: true
                }
            },
            serviceDetails: {
                select: {
                    name: true,
                    image: true,
                    duration: true
                }
            }
        }
    });
    const allBooking = result.map((booking) => {
        return {
            id: booking.id,
            status: booking.status,
            location: booking.location,
            details: booking.description,
            paid: booking.isPaid,
            date: booking.date,
            name: booking.userDetails.name,
            email: booking.userDetails.email,
            serviceName: booking.serviceDetails.name,
            serviceImage: booking.serviceDetails.image,
            serviceTime: booking.serviceDetails.duration
        };
    });
    return allBooking;
});
const getMyBookingService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.booking.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            status: true,
            date: true,
            isPaid: true,
            serviceDetails: {
                select: {
                    name: true,
                    image: true,
                    duration: true,
                    price: true
                }
            },
            assigns: true
        }
    });
    const myService = yield Promise.all(result.map((booking) => __awaiter(void 0, void 0, void 0, function* () {
        const assignUsers = yield Promise.all(booking.assigns.map((assign) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.prisma.user.findMany({
                where: {
                    id: assign
                },
                select: {
                    name: true
                }
            });
        })));
        return {
            id: booking.id,
            status: booking.status,
            date: booking.date,
            paid: booking.isPaid,
            name: booking.serviceDetails.name,
            image: booking.serviceDetails.image,
            duration: booking.serviceDetails.duration,
            price: booking.serviceDetails.price,
            assigns: assignUsers.flat()
        };
    })));
    return myService;
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.booking.findUnique({
        where: {
            id: id
        }
    });
    return result;
});
const assignServiceToBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.booking.update({
            where: {
                id: payload.bookingId
            },
            data: {
                assigns: payload.assigns
            }
        });
        return result;
    }
    catch (_a) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION, "Booking not found");
    }
});
const completeBooking = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.booking.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                status: "COMPLETED"
            }
        });
        return result;
    }
    catch (_a) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NON_AUTHORITATIVE_INFORMATION, "Booking not found");
    }
});
exports.bookingService = { createBooking, getAllBookingByStatus, getMyBookingService, getSingleBooking, assignServiceToBooking, completeBooking };
