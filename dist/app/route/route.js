"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const service_Routes_1 = require("../modules/service/service.Routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const worker_Routes_1 = require("../modules/worker/worker.Routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const review_Routes_1 = require("../modules/review/review.Routes");
// import { foodRoutes } from "../modules/foods/foods.Routes"
// import { locationRoutes } from "../modules/location/location.Routes"
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/user",
        component: user_routes_1.userRoutes
    },
    {
        path: "/auth",
        component: auth_routes_1.authRoutes
    },
    {
        path: "/service",
        component: service_Routes_1.serviceRoutes
    },
    {
        path: "/booking",
        component: booking_routes_1.bookingRoutes
    },
    {
        path: "/worker",
        component: worker_Routes_1.workerRoutes
    },
    {
        path: "/payment",
        component: payment_routes_1.paymentRoutes
    },
    {
        path: "/review",
        component: review_Routes_1.reviewRoutes
    },
];
routes.forEach(route => router.use(route.path, route.component));
exports.default = router;
