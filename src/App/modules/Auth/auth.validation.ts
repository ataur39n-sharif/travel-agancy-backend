import {z, ZodType} from "zod";
import {ILoginPayload, ISignUpPayload} from "@/App/modules/Auth/auth.types";
import {EnumRole} from "@prisma/client";

const SignUpZodSchema: ZodType<ISignUpPayload> = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum([EnumRole.user, EnumRole.admin, EnumRole.superAdmin])
})

const LoginZodSchema: ZodType<ILoginPayload> = z.object({
    email: z.string().email(),
    password: z.string()
})

export const AuthValidation = {
    SignUpZodSchema,
    LoginZodSchema
}