import {Router} from "express";
import AccessOnly from "@/Middlewares/AccessLimit";
import AuthRoutes from "@/App/modules/Auth/auth.routes";
import UserRoutes from "@/App/modules/User/user.routes";
import TourPackageRoutes from "@/App/modules/TourPackage/tourPackage.routes";
import OrderRoutes from "@/App/modules/Order/order.routes";
import ReviewRoutes from "@/App/modules/Review/review.routes";

const rootRouter = Router()

rootRouter
    .use('/auth',AuthRoutes)
    .use('/users',UserRoutes)
    .use('/tour-packages',TourPackageRoutes)
    .use('/orders',OrderRoutes)
    .use('/reviews',ReviewRoutes)

export default rootRouter