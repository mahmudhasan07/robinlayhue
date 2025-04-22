import { StatusCodes } from "http-status-codes"
import sendResponse from "../../middleware/sendResponse"
import { bookingService } from "./booking.service"
import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { paginationSystem } from "../../helper/pagination"

const createBookingController = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.user
    const payload = req.body
    const result = await bookingService.createBooking(payload, id)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Booking created successfully", data: result, success: true })
})

const getAllBookingController = catchAsync(async (req: Request, res: Response) => {

    const result = await bookingService.getAllBookingByStatus({ status: req.query.status as any })
    const {data, limit, page, total, totalPage} = await paginationSystem(result, req)

    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking fetched successfully", data: data, success: true,  meta :{limit, page, total, totalPage} })

})
// const getAllBookingController = catchAsync(async (req: Request, res: Response) => {
//     const options = req.query; 
    
//     const result = await bookingService.getAllBookingByStatus(options as any)

//     // const data = await paginationSystem(result, req)

//     sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking fetched successfully", data: result, success: true, })

// })


const singleBookingController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await bookingService.getSingleBooking(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking fetched successfully", data: result, success: true })
})

const myBookingController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const result = await bookingService.getMyBookingService(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking fetched successfully", data: result, success: true })
})

const assignBookingController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const { id } = req.user
    const result = await bookingService.assignServiceToBooking(payload, id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking updated successfully", data: result, success: true })
})

const completeBookingController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const { id: userId } = req.user
    const result = await bookingService.completeBooking(id, userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Booking completed successfully", data: result, success: true })
})




export const bookingController = { createBookingController, getAllBookingController, myBookingController, assignBookingController, completeBookingController, singleBookingController }