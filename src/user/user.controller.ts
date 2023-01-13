import { Router } from "express";
import { Request, Response } from "express";
import { create, read, readUsers } from "./user.service";
import { RegistrationError } from "./errors/registration.error";
import { checkRole } from "../helpers/checkRole";
import { RoleError } from "../errors/role.error";
import { NotUserError } from "./errors/notUser.error";

const userController = Router();

userController.post('/create', (req: Request, res: Response) => {
    const {payload: { role } } = req.body;

    if (checkRole(['ADMIN'], role)) {

        delete req.body.payload;

        create(req.body)
        .then(() => res.status(201).send())
        .catch((err: RegistrationError) => res.status(404).send(err.message));
    } else {
        res.status(403).send(new RoleError().message);
    }
});


userController.get('/read', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;

    if (checkRole(['ADMIN', 'DESIGNER', 'CLIENT'], role)) {
        console.log(req.params)
        read(req.params.login)
        .then((user) => res.status(200).send(user))
        .catch((err: NotUserError) => res.status(404).send(err.message));
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});


userController.get('/read/users', (req: Request, res: Response) => {
    
    const {payload: { role, login } } = req.body;

    if (checkRole(['ADMIN', 'DESIGNER', 'CLIENT'], role)) {
        readUsers(login)
        .then((users) => res.status(200).send(users))
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});


export default userController;