import { OrderStatus, Role } from "@prisma/client"
import { prisma } from "../../../utils/prisma"
import { getImageUrl } from "../../helper/uploadFile"
import ApiError from "../../error/ApiErrors"
import { stat } from "fs"
import { StatusCodes } from "http-status-codes"
import { hash } from "bcrypt"

const createWorker = async (payload: any, file: any) => {
    const imageUrl = file && await getImageUrl(file)

    const findUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (findUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User already exists")
    }

    const pass = await hash(payload.password, 10)

    const result = await prisma.user.create({
        data: {
            ...payload,
            isVerified: true,
            status: "ACTIVE",
            password: pass,
            role: Role.WORKER,
            image: imageUrl
        }
    })
    return result
}

const getAllWorker = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: "WORKER"
        },
        select: {
            id: true,
            name: true,
            image: true,
            location: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    })
    return result
}


const myAssignService = async (id: string, status: string) => {

    const result = await prisma.booking.findMany({
        where: {
            assigns: {
                has: id
            },
            status: status.toUpperCase() as OrderStatus
        },
        select: {
            id: true,
            userId: true,
            serviceId: true,
            date: true,
            status: true,
            location: true,
            description: true,
            userDetails: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            serviceDetails: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    price: true

                }
            }
        }


    })
    return result
}
const myAllAssignService = async (id: string) => {

    const result = await prisma.booking.findMany({
        where: {
            assigns: {
                has: id
            },
        },
        select: {
            id: true,
            userId: true,
            serviceId: true,
            date: true,
            status: true,
            location: true,
            description: true,
            userDetails: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            serviceDetails: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    price: true

                }
            }
        }


    })
    return result
}


const singleWorkerProfile = async (id: string) => {

    const myUser = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            location: true
        }
    })

    if (!myUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found")
    }


    return myUser
}

const workersAssign = async (id: string, status: string) => {
    const result = await prisma.booking.findMany({
        where: {
            assigns: {
                has: id
            },
            status: status.toUpperCase() as OrderStatus
        },
        include: {
            userDetails: {
                select: {
                    name: true,
                }
            },
        }

    })
    return result
}



export const workerService = { createWorker, getAllWorker, myAssignService,  singleWorkerProfile, workersAssign, myAllAssignService }