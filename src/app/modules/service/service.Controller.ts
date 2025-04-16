import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { serviceServices } from "./service.Service";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";

const createServiceController = catchAsync(async (req: Request, res: Response) => {
    const body = req.body as any
    const image = req.file as any

    const result = await serviceServices.createServiceIntoDB(body, image)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Service created successfully", data: result, success: true })
})

const getAllServiceController = catchAsync(async (req: Request, res: Response) => {

    const review = req.query.review as string

    const result = await serviceServices.getAllServiceFromDB(review)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "All services", data: result, success: true })
})

const getSingleServiceController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await serviceServices.getSingleServiceFromDB(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Single service", data: result, success: true })
})

const updateServiceController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body as any
    const image = req.file as any

    const result = await serviceServices.updateServiceIntoDB(id, body, image)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Service created successfully", data: result, success: true })
})

const deleteServiceController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await serviceServices.deleteServiceFromDB(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Service deleted successfully", data: result, success: true })

})

const searchServiceController = catchAsync(async (req: Request, res: Response) => {
    const name = req.query.name as string

    const result = await serviceServices.searchServiceFromDB(name)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Service found successfully", data: result, success: true })
})


export const ServiceController = { createServiceController, getAllServiceController, getSingleServiceController, updateServiceController, deleteServiceController, searchServiceController }