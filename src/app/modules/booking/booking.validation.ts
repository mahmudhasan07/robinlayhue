import { z } from "zod";

const createBookingValidation = z.object({
    serviceId: z.string(),
    date: z.string().refine((date) => !isNaN(Date.parse(date))),
    description: z.string(),
    location: z.string(),
    // latitude: z.number(),
    // longitude: z.number(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
})

const assignBookingValidation = z.object({
    bookingId: z.string(),
    assigns: z.array(z.string())
})

export const bookingValidation = { createBookingValidation, assignBookingValidation }