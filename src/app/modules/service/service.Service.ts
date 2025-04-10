import { StatusCodes } from "http-status-codes"
import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"
import { getImageUrl } from "../../helper/uploadFile"

const createServiceIntoDB = async (payload: any, image: Express.MulterS3.File) => {

    const imageUrl = await getImageUrl(image)

    const findService = await prisma.service.findFirst({
        where: {
            name: payload.name
        }
    })
    if (findService) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service already exists")
    }

    const result = await prisma.service.create({
        data: {
            ...payload,
            image: imageUrl,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    })
    return result
}

const getAllServiceFromDB = async () => {
    const result = await prisma.service.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    })
    return result
}

const getSingleServiceFromDB = async (id: string) => {
    const result = await prisma.service.findUnique({
        where: {
            id
        },
        include: {
            Review: true
        }
    })
    return result
}


const updateServiceIntoDB = async (id: string, payload: any, image: Express.MulterS3.File) => {

    const imageUrl = await getImageUrl(image)

    const findService = await prisma.service.findUnique({
        where: {
            id
        }
    })
    if (!findService) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service not found")
    }

    const result = await prisma.service.update({
        where: {
            id
        },
        data: {
            ...payload,
            image : imageUrl ?? undefined
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    })
    return result
}

const deleteServiceFromDB = async (id: string) => {
    try {
        const result = await prisma.service.delete({
            where: {
                id
            }
        })
        return result

    } catch {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service not found")
    }
}

export const serviceServices = { createServiceIntoDB, getAllServiceFromDB, getSingleServiceFromDB, updateServiceIntoDB, deleteServiceFromDB }