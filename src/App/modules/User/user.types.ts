import {IOrder} from "@/App/modules/Order/order.types";
import {IReviews} from "@/App/modules/Review/review.types";

export interface IUser {
    id: string
    name: string
    email: string
    picture: string
    bio: string
    location: string
    authId: string
    createdAt: string
    updatedAt: string
    orders: IOrder[]
    reviews: IReviews[]
}