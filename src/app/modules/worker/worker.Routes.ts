import { Router } from "express"
import auth from "../../middleware/auth"
import { Role } from "@prisma/client"
import { workerController } from "./worker.Controller"
import { fileUploader } from "../../helper/uploadFile"
import { parseBodyMiddleware } from "../../middleware/parseBodyData"
import validateRequest from "../../middleware/validateRequest"
import { WorkerValidation } from "./worker.Validation"

const route = Router()
route.post("/create", auth(Role.ADMIN), fileUploader.uploadProfileImage, parseBodyMiddleware, validateRequest(WorkerValidation.createWorkerValidation), workerController.createWorkerController)
route.get("/", auth(Role.ADMIN), workerController.getAllWorkerController)
route.get("/myAssign", auth(Role.WORKER), workerController.myAssignController)
route.get("/my-all-assign-service", auth(Role.WORKER), workerController.myAllAssignServiceController)

route.get("/:id", auth(Role.ADMIN), workerController.singleWorkerProfileController)
route.get("/assign/:id", auth(Role.ADMIN), workerController.singleWorkerAssignsController)

export const workerRoutes = route