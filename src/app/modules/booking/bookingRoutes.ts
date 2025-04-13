import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { bookingController } from "./bookingController";
import { bookingValidation } from "./bookingValidation";

const route = Router()

route.post('/create', auth(Role.USER), validateRequest(bookingValidation.createBookingValidation), bookingController.createBookingController)
route.get("/", auth(Role.ADMIN), bookingController.getAllBookingController)
route.get("/myBooking", auth(Role.USER), bookingController.myBookingController)