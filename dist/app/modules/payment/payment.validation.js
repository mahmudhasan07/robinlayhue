"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const createPaymentValidation = zod_1.z.object({
    amount: zod_1.z.number().min(1, "Amount must be greater than 0"),
    paymentMethod: zod_1.z.string().min(1, "Payment method is required").optional(),
    paymentMethodId: zod_1.z.string().min(1, "Payment method id is required"),
    bookId: zod_1.z.string().min(1, "Book id is required"),
});
exports.PaymentValidation = { createPaymentValidation };
