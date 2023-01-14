import { Router } from "express";
import { Request, Response } from "express";
import { change, create, read, readUsers, remove } from "./user.service";
import { RegistrationError } from "./errors/registration.error";
import { checkRole } from "../helpers/checkRole";
import { RoleError } from "../errors/role.error";
import { NotUserError } from "./errors/notUser.error";
import { ChangeUserError } from "./errors/changeUser.error";
import { DeleteUserError } from "./errors/deleteUser.error";

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

// изменения, которые может внести администратор
userController.put('/change', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;

    if (checkRole(['ADMIN'], role)) {
        change(req.body)
        .then(() => res.status(200).send())
        .catch((err: ChangeUserError) => res.status(400).send(err.message));
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

userController.delete('/delete', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;
    
    if (checkRole(['ADMIN'], role)) {
        const id_user = req.query.id_user;
        if (id_user) {
            remove(id_user.toString())
            .then(() => res.status(200).send())
            .catch((err: DeleteUserError) => res.status(400).send(err.message));
        }
       
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});


export default userController;