"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerValidation = void 0;
const zod_1 = require("zod");
const createWorkerValidation = zod_1.z.object({
    name: zod_1.z.string().min(2).max(255),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long")
    // .regex(/[a-zA-Z0-9]/, "Password must contain only letters and numbers")
});
const updateWorkerValidation = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Invalid email").optional(),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long").optional()
});
exports.WorkerValidation = { createWorkerValidation, updateWorkerValidation };
