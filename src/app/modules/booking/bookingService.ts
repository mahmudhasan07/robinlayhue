import { Booking, OrderStatus } from "@prisma/client"
import { prisma } from "../../../utils/prisma"

const createBooking = async (payload: Booking) => {
    const result = await prisma.booking.create({
        data: {
            ...payload
        }
    })
    return result
}

const getAllServicesByStatus = async (payload: { status: OrderStatus }) => {
    const result = await prisma.booking.findMany({
        where: {
            status: payload.status
        }
    })
    return result
}

const getMyBookingService = async (userId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            userId: userId
        }
    })
    return result
}

const getSingleBooking = async (id: string) => {
    const result = await prisma.booking.findUnique({
        where: {
            id: id
        }
    })
    return result
}


export const bookingService = { createBooking, getAllServicesByStatus, getMyBookingService, getSingleBooking }