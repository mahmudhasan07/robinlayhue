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
        throw new ApiError(StatusCodes.CONFLICT, "Service already exists")
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
            price: true,
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
            price: item.price,
            updatedAt: item.updatedAt,
            Review: avgReview,
            totalReview: item.Review.length
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
            Review: {
                include: {
                    userDetails: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                }
            }
        }
    })

    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service not found")
    }

    const avgRating = await prisma.review.aggregate({
        where: {
            serviceId: id
        },
        _avg: {
            rating: true
        }
    })

    const reviewDetails = await Promise.all(result.Review.map(async (item) => {

        return {
            id: item.id,
            rating: item.rating,
            comment: item.comment,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            userName: item.userDetails.name,
            userImage: item.userDetails.image
        }
    }))


    const { Review, ...withoutReview } = result



    return {
        ...withoutReview, avgRating: avgRating._avg.rating, Review: reviewDetails
    }
    // return { ...result, avgReview: singleService, totalReview }
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