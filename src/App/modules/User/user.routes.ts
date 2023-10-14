import {Router} from "express";
import {UserController} from "@/App/modules/User/user.controller";

const UserRoutes = Router()

UserRoutes
    .get('/', UserController.allUser)
    .get('/:id', UserController.userInfo)
    .patch('/:id', UserController.updateInfo)


export default UserRoutes