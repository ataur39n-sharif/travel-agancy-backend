import {Router} from "express";
import {AuthController} from "@/App/modules/Auth/auth.controller";
import {UserMiddlewares} from "@/App/modules/User/user.middlewares";

const AuthRoutes = Router()

AuthRoutes
    .post(
        '/login',
        UserMiddlewares.userExists,
        AuthController.login
    )
    .post('/signup', AuthController.signUp)

export default AuthRoutes