import {ILoginPayload, ISignUpPayload, ITokenPayload} from "@/App/modules/Auth/auth.types";
import {prisma} from "@/Config";
import {AuthInfo, EnumRole, Prisma} from "@prisma/client";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {generateToken} from "@/Utils/helper/generateToken";
import CustomError from "@/Utils/errors/customErrror.class";

const createAccount = async (payload: ISignUpPayload) => {
    const oldUser = await prisma.authInfo.findFirst({
        where: {
            email: payload.email
        }
    })
    if (oldUser) throw new CustomError('User Already exists', 400)

    return prisma.$transaction(async (tx) => {
        //create new user
        const newUser: Prisma.UserCreateInput = {
            name: payload.name,
            email: payload.email
        }
        const user = await tx.user.create({
            data: newUser
        })

        //setting up user authentication information
        const authData: Prisma.AuthInfoCreateInput = {
            email: payload.email,
            password: await HashHelper.generateHashPassword(payload.password),
            role: payload.role,
            userInfo: {
                connect: {
                    id: user.id
                }
            }
        }
        await tx.authInfo.create({
            data: authData
        })
    })
}

const login = async (payload: ILoginPayload, user?: AuthInfo) => {
    let authData = user ?? null

    if (!authData) {
        authData = await prisma.authInfo.findFirst({
            where: {
                email: payload.email
            }
        })
    }

    const validate = await HashHelper.comparePassword(payload.password, authData?.password as string)
    if (!validate) throw new CustomError('Email or password is incorrect', 400)

    const tokenData: ITokenPayload = {
        id: authData?.userId as string,
        role: authData?.role as EnumRole
    }
    const refreshToken = generateToken.refreshToken(tokenData)
    const accessToken = generateToken.accessToken(tokenData)

    return {
        refreshToken,
        accessToken
    }
}

export const AuthServices = {
    createAccount,
    login,
}