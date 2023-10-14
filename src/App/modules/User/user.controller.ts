import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {z} from "zod";
import {UserServices} from "@/App/modules/User/user.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {Prisma} from "@prisma/client";
import {UserValidations} from "@/App/modules/User/user.validation";

const allUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const data = await UserServices.users()

    sendResponse.success(res, {
        statusCode: 200,
        message: 'data fetched successfully.',
        data
    })

})


const userInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id is required.'
    }).parse(req.params.id)

    const data = await UserServices.userInfo(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'data fetched successfully.',
        data
    })

})


const updateInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id is required.'
    }).parse(req.params.id)

    const payload = pickFunction<Prisma.UserUpdateInput, keyof Prisma.UserUpdateInput>(req.body, ['name', 'bio', 'location', 'picture'])
    const validate = UserValidations.UserUpdateZodSchema.partial().parse(payload)

    const data = await UserServices.updateInfo(id, validate)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'User data updated successfully.',
        data
    })
})
export const UserController = {
    allUser,
    userInfo,
    updateInfo
}