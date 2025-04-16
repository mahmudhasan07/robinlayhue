import { prisma } from "../../../utils/prisma"

const createReviewInDB = async (payload: { serviceId: string, rating: number, comment: string }, userId: string) => {


    console.log(payload);
    

    const result = await prisma.review.create({
        data: {
            ...payload,
            userId: userId
        }
    })
    return result
}

const getAllReviewFromDB = async () => {
    const result = await prisma.review.findMany({})
    return result
}

const getSingleReviewFromDB = async (id: string) => {
    const result = await prisma.review.findUnique({
        where: {
            id
        }
    })
    return result
}


export const ReviewService = { createReviewInDB, getAllReviewFromDB, getSingleReviewFromDB }