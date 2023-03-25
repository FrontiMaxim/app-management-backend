import { Response } from "express";
import { RoleError } from "../errors/role.error";

export const checkRole = (allowedRoles: string[], role: string, res: Response) => {
    if(allowedRoles.includes(role)) {
        res.status(403).send(new RoleError().message);
    }
}

