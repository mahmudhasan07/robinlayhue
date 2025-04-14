import { Booking, OrderStatus } from "@prisma/client"
import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"

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

const assignServiceToBooking = async (payload: { bookingId: string, assigns: string[] }) => {

    try {
        const result = await prisma.booking.update({
            where: {
                id: payload.bookingId
            },
            data: {
                assigns: payload.assigns
            }
        })
    } catch {
        throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, "Booking not found")
    }

}


const completeBooking = async (id: string) => {
    const result = await prisma.booking.update({
        where: {
            id: id
        },
        data: {
            status: "COMPLETED"
        }
    })
    return result
}


export const bookingService = { createBooking, getAllServicesByStatus, getMyBookingService, getSingleBooking, assignServiceToBooking , completeBooking}