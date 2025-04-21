import { StatusCodes } from "http-status-codes"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../middleware/sendResponse"
import { workerService } from "./worker.Service"
import { Request, Response } from "express"
import { paginationSystem } from "../../helper/pagination"
import { stat } from "fs"

const createWorkerController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const file = req.file
    const result = await workerService.createWorker(payload, file)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })
})

const getAllWorkerController = catchAsync(async (req: Request, res: Response) => {

    const meta = req.query.meta as string

    const result = await workerService.getAllWorker()

    if (meta === "true") {
        const { data, limit, page, total, totalPage } = await paginationSystem(result, req)
        sendResponse(res, { statusCode: StatusCodes.OK, message: "All users", data: data, success: true, meta: { limit, page, total, totalPage } })
        return
    }

    sendResponse(res, { statusCode: StatusCodes.OK, message: "All users", data: result, success: true })
})

const myAssignController = catchAsync(async (req: Request, res: Response) => {

    const status = req.query.status as string
    const { id } = req.user
    const result = await workerService.myAssignService(id, status   )
    sendResponse(res, { statusCode: StatusCodes.OK, message: "All users", data: result, success: true })
})

const myAllAssignServiceController = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.user
    const result = await workerService.myAllAssignService(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "My All Assign Service", data: result, success: true })
})


const singleWorkerProfileController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await workerService.singleWorkerProfile(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "All users", data: result, success: true })
})

const singleWorkerAssignsController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const status = req.query.status as string
    const result = await workerService.workersAssign(id, status)
    const {data, limit, page, total, totalPage} = await paginationSystem(result, req)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Single worker assigns project", data: data, success: true, meta :{limit, page, total, totalPage} })
})
 
export const workerController = { createWorkerController, getAllWorkerController, myAssignController, singleWorkerProfileController, singleWorkerAssignsController, myAllAssignServiceController }