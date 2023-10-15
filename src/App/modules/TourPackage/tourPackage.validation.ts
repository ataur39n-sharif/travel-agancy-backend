import {z} from "zod";

const createOrUpdatePayload = z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    images: z.array(z.string()),
    location: z.string(),
    cost: z.number(),
})

export const TourPackageValidation = {
    createOrUpdatePayload
}