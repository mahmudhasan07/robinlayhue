import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { ReviewController } from "./review.Controller";

const route = Router()

route.post('/create', auth(Role.USER), ReviewController.createReviewController )

route.get('/', auth(Role.USER), ReviewController.getAllReviewController )

route.get('/:id', auth(Role.USER), ReviewController.getSingleReviewController )


export const reviewRoutes = route