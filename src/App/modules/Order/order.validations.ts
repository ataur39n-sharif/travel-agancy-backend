import {z} from "zod";
import {EnumOrderStatus} from "@prisma/client";

const createOrUpdateZodSchema = z.object({
    userId: z.string(),
    tourPackageId: z.string(),
    travelDate: z.string(),
    person: z.number(),
    child: z.number(),
    status: z.enum([
        EnumOrderStatus.hold,
        EnumOrderStatus.canceled,
        EnumOrderStatus.confirmed,
        EnumOrderStatus.complete,
        EnumOrderStatus.pending,
        EnumOrderStatus.processing
    ])
})

export const OrderValidation = {
    createOrUpdateZodSchema
}