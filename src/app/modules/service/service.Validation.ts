import { z } from "zod";

const ServiceCreateValidation = z.object({
    name: z.string().min(2).max(255),
    description: z.string().min(2).max(255),
    price: z.number().positive("Price must be a positive number"),
    duration: z.string().min(2).max(255),
    imageUrl: z.string().url("Invalid image URL").optional(),
})

const serviceUpdateValidation = z.object({
    name: z.string().min(2).max(255).optional(),
    description: z.string().min(2).max(255).optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    duration: z.string().min(2).max(255).optional(),
    imageUrl: z.string().url("Invalid image URL").optional(),
})

export const ServiceValidation = {serviceUpdateValidation, ServiceCreateValidation}

