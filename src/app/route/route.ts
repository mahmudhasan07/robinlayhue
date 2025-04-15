import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { authRoutes } from "../modules/auth/auth.routes"
import { serviceRoutes } from "../modules/service/service.Routes"
import { bookingRoutes } from "../modules/booking/booking.routes"
import { workerRoutes } from "../modules/worker/worker.Routes"
// import { foodRoutes } from "../modules/foods/foods.Routes"
// import { locationRoutes } from "../modules/location/location.Routes"

const router = Router()
const routes = [
    {
        path: "/user",
        component: userRoutes
    },
    {
        path: "/auth",
        component: authRoutes
    },
    {
        path: "/service",
        component: serviceRoutes
    },
    {
        path: "/booking",
        component: bookingRoutes
    },
    {
        path: "/worker",
        component: workerRoutes
    }
]

routes.forEach(route => router.use(route.path, route.component))
export default router 