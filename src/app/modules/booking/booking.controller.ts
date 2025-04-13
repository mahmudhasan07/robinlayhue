import { StatusCodes } from "http-status-codes"
import sendResponse from "../../middleware/sendResponse"
import { bookingService } from "./booking.service"
import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"

const createBookingController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await bookingService.createBooking(payload)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Booking created successfully", data: result, success: true })
})

const getAllBookingController = catchAsync(async (req: Request, res: Response) => {

    const result = await bookingService.getAllServicesByStatus({ status: req.query.status as any })
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking fetched successfully", data: result, success: true })

})

const myBookingController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const result = await bookingService.getMyBookingService(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking fetched successfully", data: result, success: true })
})

const assignBookingController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await bookingService.assignServiceToBooking(payload)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking updated successfully", data: result, success: true })
})

const completeBookingController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await bookingService.completeBooking(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking completed successfully", data: result, success: true })
})




export const bookingController = { createBookingController, getAllBookingController, myBookingController, assignBookingController, completeBookingController }