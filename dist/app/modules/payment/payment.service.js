"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const stripe_1 = require("../../../config/stripe");
const prisma_1 = require("../../../utils/prisma");
const ApiErrors_1 = __importDefault(require("../../error/ApiErrors"));
const createIntentInStripe = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield stripe_1.stripe.paymentIntents.create({
        amount: Math.round(payload.amount * 100),
        currency: (payload === null || payload === void 0 ? void 0 : payload.paymentMethod) || "usd",
        payment_method: payload.paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never",
        },
    });
    console.log(payment);
    if (payment.status !== "succeeded") {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Payment failed");
    }
    yield prisma_1.prisma.payment.create({
        data: {
            userId: userId,
            amount: payload.amount,
            paymentMethod: payload.paymentMethod,
            bookingId: payload.bookId,
        },
    });
    const completePayment = yield prisma_1.prisma.booking.update({
        where: {
            id: payload.bookId,
        },
        data: {
            isPaid: true,
        },
    });
    return completePayment;
});
const saveCardInStripe = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new ApiErrors_1.default(404, "User not found!");
    }
    const { paymentMethodId, cardholderName } = payload;
    let customerId = user.customerId;
    if (!customerId) {
        const customer = yield stripe_1.stripe.customers.create({
            email: user.email,
            payment_method: paymentMethodId,
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });
        customerId = customer.id;
        yield prisma_1.prisma.user.update({
            where: { id: userId },
            data: { customerId },
        });
    }
    const paymentMethods = yield stripe_1.stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
    });
    const newCard = yield stripe_1.stripe.paymentMethods.retrieve(paymentMethodId);
    const existingCard = paymentMethods.data.find((card) => card.card.last4 === newCard.card.last4);
    if (existingCard) {
        throw new ApiErrors_1.default(409, "This card is already saved.");
    }
    else {
        yield stripe_1.stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
        yield stripe_1.stripe.paymentMethods.update(paymentMethodId, {
            billing_details: {
                name: cardholderName,
            },
        });
        return {
            message: "Customer created and card saved successfully",
        };
    }
});
const getSaveCardsFromStripe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new ApiErrors_1.default(404, "User not found!");
    }
    try {
        const saveCard = yield stripe_1.stripe.paymentMethods.list({
            customer: (user === null || user === void 0 ? void 0 : user.customerId) || "",
            type: "card",
        });
        const cardDetails = saveCard.data.map((card) => {
            var _a, _b, _c, _d, _e, _f;
            return {
                id: card.id,
                brand: (_a = card.card) === null || _a === void 0 ? void 0 : _a.brand,
                last4: (_b = card.card) === null || _b === void 0 ? void 0 : _b.last4,
                type: ((_d = (_c = card.card) === null || _c === void 0 ? void 0 : _c.checks) === null || _d === void 0 ? void 0 : _d.cvc_check) === "pass" ? "valid" : "invalid",
                exp_month: (_e = card.card) === null || _e === void 0 ? void 0 : _e.exp_month,
                exp_year: (_f = card.card) === null || _f === void 0 ? void 0 : _f.exp_year,
                billing_details: card.billing_details,
            };
        });
        return cardDetails;
    }
    catch (_a) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found!");
    }
});
const deleteCardFromStripe = (userId, last4) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new ApiErrors_1.default(404, "User not found!");
    }
    if (!user.customerId) {
        throw new ApiErrors_1.default(404, "Card is not saved");
    }
    const paymentMethods = yield stripe_1.stripe.paymentMethods.list({
        customer: user.customerId,
        type: "card",
    });
    const card = paymentMethods.data.find((card) => card.card.last4 === last4);
    if (!card) {
        throw new ApiErrors_1.default(404, "Card not found!");
    }
    yield stripe_1.stripe.paymentMethods.detach(card.id);
});
exports.paymentService = { createIntentInStripe, saveCardInStripe, getSaveCardsFromStripe, deleteCardFromStripe };
