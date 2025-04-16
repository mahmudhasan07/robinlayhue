import { StatusCodes } from "http-status-codes"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { workerService } from "./worker.Service"
import { Request, Response } from "express"

const createWorkerController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const file = req.file
    const result = await workerService.createWorker(payload, file)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })
})

const getAllWorkerController = catchAsync(async (req: Request, res: Response) => {
    const result = await workerService.getAllWorker()
    sendResponse(res, { statusCode: StatusCodes.OK, message: "All users", data: result, success: true })
})


export const workerController = { createWorkerController, getAllWorkerController }