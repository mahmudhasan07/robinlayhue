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
        }
    })
    return result
}

const getAllServiceFromDB = async (review: string) => {
    const result = await prisma.service.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            Review: true
        }
    })

    const formattedResult = result.map((item) => {

        const avgReview = item.Review.reduce((acc, curr) => acc + curr.rating, 0)

        return {
            id: item.id,
            name: item.name,
            image: item.image,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            Review: avgReview
        }
    })

    if (review) {
        const sortedResult = formattedResult.filter((item) => item.Review >= 1)
        return sortedResult
    }

    return formattedResult
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

    const imageUrl = image && await getImageUrl(image)

    try {
        const result = await prisma.service.update({
            where: {
                id
            },
            data: {
                ...payload,
                image: imageUrl ?? undefined
            }
        })
        return result
    } catch {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service not found")
    }
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


const searchServiceFromDB = async (name: string) => {
    const result = await prisma.service.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        }
    })

    return result
}


export const serviceServices = { createServiceIntoDB, getAllServiceFromDB, getSingleServiceFromDB, updateServiceIntoDB, deleteServiceFromDB, searchServiceFromDB }