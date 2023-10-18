import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {OrderServices} from "@/App/modules/Order/order.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {z} from "zod";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {IOrder} from "@/App/modules/Order/order.types";
import {OrderValidation} from "@/App/modules/Order/order.validations";

const allOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await OrderServices.allOrders()
    sendResponse.success(res, {
        statusCode: 200,
        message: 'All data fetched.',
        data
    })
})

const singleOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id required.'
    }).parse(req.params.id)

    const data = await OrderServices.singleOrder(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data fetched.',
        data
    })
})

const ownOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Authorization Required.'
    }).parse(req.body.id)

    const data = await OrderServices.individualUserOrders(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data fetched.',
        data
    })

})

const createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction<IOrder, keyof IOrder>(req.body, [
        "person", "child", "travelDate", "totalCost", "userId", "tourPackageId"
    ])

    const validatedData = OrderValidation.createOrUpdateZodSchema.parse(payload)
    const data = await OrderServices.newOrder(validatedData)

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Order placed successfully.',
        data
    })
})

const updateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id required.'
    }).parse(req.params.id)

    const payload = pickFunction<IOrder, keyof IOrder>(req.body, [
        "person", "child", "travelDate", "totalCost", "tourPackageId", "status"
    ])

    const validatedData = OrderValidation.createOrUpdateZodSchema.partial().parse(payload)
    const data = await OrderServices.updateOrder(id, validatedData)

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Order updated successfully.',
        data
    })

})

const deleteOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id required.'
    }).parse(req.params.id)

    await OrderServices.deleteOrder(id)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data deleted successfully .',
    })
})


export const OrderController = {
    allOrders,
    singleOrder,
    ownOrders,
    createOrder,
    updateOrder,
    deleteOrder
}