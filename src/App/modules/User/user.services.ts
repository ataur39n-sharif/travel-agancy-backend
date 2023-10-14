import {prisma} from "@/Config";
import {Prisma} from "@prisma/client";

const users = async () => {
    return prisma.user.findMany()
}
const userInfo = async (id: string) => {
    return prisma.user.findFirst({
        where: {
            id
        }
    })
}

const updateInfo = async (id: string, payload: Partial<Prisma.UserUpdateInput>) => {
    return prisma.user.update({
        where: {
            id
        },
        data: payload
    })
}
export const UserServices = {
    users,
    userInfo,
    updateInfo
}