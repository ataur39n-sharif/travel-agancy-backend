import {EnumOrderStatus} from "@prisma/client";
import {IReviews} from "@/App/modules/Review/review.types";

export interface IOrder {
    id: string
    tourPackageId: string
    userId: string
    travelDate: string
    person: number
    child: number
    totalCost: number
    status: EnumOrderStatus
    createdAt: string
    updatedAt: string

    reviews: IReviews[]
}