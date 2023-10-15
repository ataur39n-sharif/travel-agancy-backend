import {Router} from "express";
import {OrderController} from "@/App/modules/Order/order.controller";

const OrderRoutes = Router()

OrderRoutes
    .get('/', OrderController.allOrders)
    .get('/own', OrderController.ownOrders)
    .get('/:id', OrderController.singleOrder)
    .post('/', OrderController.createOrder)
    .patch('/id', OrderController.updateOrder)
    .delete('/:id', OrderController.deleteOrder)

export default OrderRoutes