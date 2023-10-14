import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {prisma} from "@/Config";
import CustomError from "@/Utils/errors/customErrror.class";
import {z} from "zod";

const userExists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction(req.body, ['email'])
    const email = z.string().parse(payload)
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) throw new CustomError('Invalid user', 404)

    req.body.user = user

    next()
})

export const UserMiddlewares = {
    userExists
}