import {Router} from "express";
import {AdminController} from "@/App/modules/Admin/admin.controller";
import {UserController} from "@/App/modules/User/user.controller";
import AccessLimit from "@/Middlewares/AccessLimit";
import {EnumRole} from "@prisma/client";

const AdminRoutes = Router()

AdminRoutes
    .post(
        '/create-user',
        AccessLimit([EnumRole.admin]),
        AdminController.createUser
    )
    .patch(
        '/update-user/:id',
        AccessLimit([EnumRole.admin]),
        UserController.updateInfo
    )

/*
* Create user
* change role
* add admin
* */
export default AdminRoutes