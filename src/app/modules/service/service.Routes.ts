import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { ServiceController } from "./service.Controller";
import { fileUploader } from "../../helper/uploadFile";
import validateRequest from "../../middleware/validateRequest";
import { ServiceValidation } from "./service.Validation";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";

const route = Router()


route.post('/create', auth(Role.ADMIN), fileUploader.serviceImage, parseBodyMiddleware, validateRequest(ServiceValidation.ServiceCreateValidation), ServiceController.createServiceController)
route.get("/", auth(), ServiceController.getAllServiceController)
route.get("/:id", auth(), ServiceController.getSingleServiceController)
route.put("/:id", auth(Role.ADMIN), fileUploader.serviceImage, parseBodyMiddleware, validateRequest(ServiceValidation.serviceUpdateValidation), ServiceController.updateServiceController)
route.delete("/:id", auth(Role.ADMIN), ServiceController.deleteServiceController)
route.get("/searchService/:name", auth(), ServiceController.searchServiceController )
export const serviceRoutes = route