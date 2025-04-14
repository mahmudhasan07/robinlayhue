import { z } from "zod";

const createBookingValidation = z.object({
    bookingId: z.string().uuid(),
    date: z.string().refine((date) => !isNaN(Date.parse(date))),
    description: z.string(),
    location: z.string(),
    latitude: z.number(),
    longitude: z.number(),
})

const assignBookingValidation = z.object({
    bookingId: z.string().uuid(),
    assigns: z.array(z.string())
})

export const bookingValidation = { createBookingValidation, assignBookingValidation }