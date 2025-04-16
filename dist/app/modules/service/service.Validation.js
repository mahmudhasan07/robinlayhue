"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const ServiceCreateValidation = zod_1.z.object({
    name: zod_1.z.string().min(2).max(255),
    description: zod_1.z.string().min(2).max(255),
    price: zod_1.z.number().positive("Price must be a positive number"),
    duration: zod_1.z.string().min(2).max(255),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional(),
});
const serviceUpdateValidation = zod_1.z.object({
    name: zod_1.z.string().min(2).max(255).optional(),
    description: zod_1.z.string().min(2).max(255).optional(),
    price: zod_1.z.number().positive("Price must be a positive number").optional(),
    duration: zod_1.z.string().min(2).max(255).optional(),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional(),
});
exports.ServiceValidation = { serviceUpdateValidation, ServiceCreateValidation };
