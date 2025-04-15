import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { bookingController } from "./booking.controller";
import { bookingValidation } from "./booking.validation";

const route = Router()

route.post('/create', auth(Role.USER), validateRequest(bookingValidation.createBookingValidation), bookingController.createBookingController)
route.get("/", auth(Role.ADMIN), bookingController.getAllBookingController)
route.get("/myBooking", auth(Role.USER), bookingController.myBookingController)
route.put("/assign", auth(Role.ADMIN), validateRequest(bookingValidation.assignBookingValidation), bookingController.assignBookingController)
route.get("/myAssign", auth(Role.WORKER), bookingController.myBookingController)
route.put("/complete/:id", auth(Role.USER), bookingController.completeBookingController)


export const bookingRoutes = route