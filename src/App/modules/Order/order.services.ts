import {prisma} from "@/Config";
import {Prisma} from "@prisma/client";
import {IOrder} from "@/App/modules/Order/order.types";

const allOrders = async () => {
    return prisma.order.findMany()
}

const singleOrder = async (id: string) => {
    return prisma.order.findFirst({
        where: {
            id
        }
    })
}

const individualUserOrders = async (id: string) => {
    return prisma.order.findMany({
        where: {
            userId: id
        }
    })
}

const newOrder = async (payload: IOrder) => {

    // @ts-ignore
    const cost = payload.tourPackageInfo.connect?.cost * (payload.person + payload?.child || 0)

    const data: Prisma.OrderCreateInput = {
        tourPackageInfo: {
            connect: {
                id: payload.tourPackageId
            }
        },
        person: payload.person,
        child: payload.child,
        travelDate: payload.travelDate,
        totalCost: cost,
        userInfo: {
            connect: {
                id: payload.userId
            }
        },
        status: payload.status
    }
    return prisma.order.create({
        data
    })
}

const updateOrder = async (id: string, payload: Prisma.OrderUpdateInput) => {
    return prisma.order.update({
        where: {
            id
        },
        data: payload
    })
}

const deleteOrder = async (id: string) => {
    return prisma.order.delete({
        where: {
            id
        }
    })
}
export const OrderServices = {
    allOrders,
    singleOrder,
    individualUserOrders,
    newOrder,
    updateOrder,
    deleteOrder
}