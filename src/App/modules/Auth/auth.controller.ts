import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {ISignUpPayload} from "@/App/modules/Auth/auth.types";
import {AuthValidation} from "@/App/modules/Auth/auth.validation";
import {AuthServices} from "@/App/modules/Auth/auth.services";
import {sendResponse} from "@/Utils/helper/sendResponse";

const signUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = pickFunction<ISignUpPayload, keyof ISignUpPayload>(req.body, ["name", "email", "password", "role"])
    const validateData = AuthValidation.SignUpZodSchema.parse({
        ...payload,
        password: String(payload.password),
        role: payload.role ?? 'user'
    })

    await AuthServices.signUp(validateData)
    sendResponse.success(res, {
        statusCode: 201,
        message: 'Account registration successful.'
    })

})

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction(req.body, ['email', 'password', 'user'])
    const validateData = AuthValidation.LoginZodSchema.parse(payload)
    const data = await AuthServices.login(validateData, payload.user)

    res.cookie('refreshToken', data.refreshToken)
    sendResponse.success(res, {
        statusCode: 200,
        message: 'Login successful.',
        data: {
            accessToken: data.accessToken
        }
    })
})

// const registration = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
// })

export const AuthController = {
    login,
    signUp
}