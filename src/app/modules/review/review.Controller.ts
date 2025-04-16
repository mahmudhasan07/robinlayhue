import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReviewService } from "./review.Service";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";

const createReviewController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user

    const result = await ReviewService.createReviewInDB(req.body, id)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Review created successfully", data: result, success: true })
})

const getAllReviewController = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.getAllReviewFromDB()
    sendResponse(res, { statusCode: StatusCodes.OK, message: "All reviews", data: result, success: true })
})

const getSingleReviewController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await ReviewService.getSingleReviewFromDB(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Single review", data: result, success: true })
})

export const ReviewController = { createReviewController, getAllReviewController, getSingleReviewController }