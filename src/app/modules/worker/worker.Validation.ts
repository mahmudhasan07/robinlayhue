import { z } from "zod";

const createWorkerValidation = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long")
    // .regex(/[a-zA-Z0-9]/, "Password must contain only letters and numbers")
})

const updateWorkerValidation = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    password: z.string().min(8, "Password must be at least 8 characters long").optional()
})

export const WorkerValidation = { createWorkerValidation, updateWorkerValidation }