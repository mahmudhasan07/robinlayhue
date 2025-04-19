import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";
import { paginationSystem } from "../../helper/pagination";


const createUserController = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.createUserIntoDB(req.body)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Please check your email for verification", data: result, success: true })
})

const getAllUserController = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllUserFromDB()
    const { data, limit, page, total, totalPage } = await paginationSystem(result, req)

    sendResponse(res, { statusCode: StatusCodes.OK, message: "All users", data: data, success: true, meta: { limit, page, total, totalPage } })
})


const resetPasswordController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const token = req.headers.authorization as string || req.body.token as string

    const result = await userServices.resetPasswordIntoDB(payload, token)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })
})

const changePasswordController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const body = req.body as any
    const result = await userServices.changePasswordIntoDB(id, body)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })
})

const updateUserController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const body = req?.body as any
    const image = req?.file as any
    const result = await userServices.updateUserIntoDB(id, body, image)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })
})

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const result = await userServices.getMyProfile(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })
})

const AdminDetails = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.Details()

    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })

})



export const userController = { createUserController, resetPasswordController, updateUserController, changePasswordController, getAllUserController, getMyProfile, AdminDetails }