import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {ISignUpPayload} from "@/App/modules/Auth/auth.types";
import {AuthValidation} from "@/App/modules/Auth/auth.validation";
import CustomError from "@/Utils/errors/customErrror.class";
import {AuthServices} from "@/App/modules/Auth/auth.services";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = pickFunction<ISignUpPayload, keyof ISignUpPayload>(req.body, ["name", "email", "password", "role"])
    const validateData = AuthValidation.SignUpZodSchema.parse({
        ...payload,
        password: String(payload.password),
        role: payload.role
    })

    if (!(validateData.role === "user")) {
        throw new CustomError('You are capable to add user role only', 403)
    }

    await AuthServices.createAccount(validateData)

    sendResponse.success(res, {
        statusCode: 201,
        message: 'User created successfully'
    })
})

export const AdminController = {
    createUser
}