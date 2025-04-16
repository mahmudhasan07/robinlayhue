"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const createBookingValidation = zod_1.z.object({
    serviceId: zod_1.z.string(),
    date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date))),
    description: zod_1.z.string(),
    location: zod_1.z.string(),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
});
const assignBookingValidation = zod_1.z.object({
    bookingId: zod_1.z.string(),
    assigns: zod_1.z.array(zod_1.z.string())
});
exports.bookingValidation = { createBookingValidation, assignBookingValidation };
