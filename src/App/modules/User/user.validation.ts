import {z} from "zod";

const UserUpdateZodSchema = z.object({
    name: z.string(),
    picture: z.string(),
    bio: z.string(),
    location: z.string(),
})


export const UserValidations = {
    UserUpdateZodSchema
}