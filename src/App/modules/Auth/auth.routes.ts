import {Router} from "express";
import {AuthController} from "@/App/modules/Auth/auth.controller";

const AuthRoutes = Router()

AuthRoutes
    .post('/login', AuthController.login)
    .post('/signup', AuthController.signUp)

export default AuthRoutes