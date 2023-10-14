import {EnumRole} from "@prisma/client";
import {JwtPayload} from "jsonwebtoken";

export interface IAuthInfo {
    id: string
    email: string
    password: string
    role: EnumRole
    userId: string
    createdAt?: string
    updatedAt?: string
}

export interface ISignUpPayload {
    name: string
    email: string
    password: string
    role: EnumRole
}

export interface ILoginPayload {
    email: string,
    password: string
}

export interface ITokenPayload extends JwtPayload {
    id: string
    role: EnumRole
}