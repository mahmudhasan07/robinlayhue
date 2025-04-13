import { z } from "zod";

const createBookingValidation = z.object({
    bookingId: z.string().uuid(),
    date: z.string().refine((date) => !isNaN(Date.parse(date))),
    description : z.string(),
    location: z.string(),
    latitude  : z.number(),
    longitude : z.number(), 
})

export const bookingValidation = {createBookingValidation}