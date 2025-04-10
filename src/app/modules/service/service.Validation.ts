import { z } from "zod";

export const ServiceValidation = z.object({
    name: z.string().min(2).max(255),
    description: z.string().min(2).max(255),
    price: z.number().positive("Price must be a positive number"),
    duration: z.string().min(2).max(255),
    imageUrl: z.string().url("Invalid image URL").optional(),
})

