import { Booking, OrderStatus } from "@prisma/client"
import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"

const createBooking = async (payload: Booking, id: string) => {
    const result = await prisma.booking.create({
        data: {
            ...payload,
            userId: id
        }
    })
    return result
}

const getAllBookingByStatus = async ( payload: { status: OrderStatus }) => {
    const result = await prisma.booking.findMany({
        where: {
            status: payload.status.toUpperCase() as OrderStatus
        },
        include: {
            userDetails: {
                select: {
                    name: true,
                    email: true
                }
            },
            serviceDetails: {
                select: {
                    name: true,
                    image: true,
                    duration: true

                }
            }
        }
    })

    const allBooking = result.map((booking) => {
        return {
            id: booking.id,
            status: booking.status,
            location: booking.location,
            details: booking.description,
            paid: booking.isPaid,
            date: booking.date,
            name: booking.userDetails.name,
            email: booking.userDetails.email,
            serviceName: booking.serviceDetails.name,
            serviceImage: booking.serviceDetails.image,
            serviceTime: booking.serviceDetails.duration
        }
    })
    return allBooking
}

const getMyBookingService = async (userId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            status: true,
            date: true,
            isPaid: true,   
            serviceDetails: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    duration: true,
                    price: true,
                }
            },
            assigns: true
        }
    });
 

    const myService = await Promise.all(result.map(async (booking) => {

        const assignUsers = await Promise.all(booking.assigns.map(async (assign) => {
            return await prisma.user.findMany({
                where: {
                    id: assign
                },
                select: {
                    name: true,
                    image: true,
                    id: true,
                }
            })


        }))
        
        return {
            id: booking.id,
            status: booking.status,
            date: booking.date,
            paid: booking.isPaid,
            name: booking.serviceDetails.name,
            image: booking.serviceDetails.image,
            duration: booking.serviceDetails.duration,
            price: booking.serviceDetails.price,
            assigns: assignUsers.flat(),
            // assignedUsers,
        }
    }))

    return myService
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
                assigns: payload.assigns,
                status: "PROGRESSING"
            }
        })

        return result
    } catch {
        throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, "Booking not found")
    }

}

const completeBooking = async (id: string, userId: string) => {
    try {
        const result = await prisma.booking.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                status: "COMPLETED"
            }
        })
        return result
    } catch {
        throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, "Booking not found")
    }
}


export const bookingService = { createBooking, getAllBookingByStatus, getMyBookingService, getSingleBooking, assignServiceToBooking, completeBooking }