import { Router } from "express";
import { Request, Response } from "express";
import { change, create, read, readParticipants, readUsers, remove, updateAvatar } from "./user.service";
import { RegistrationError } from "./errors/registration.error";
import { checkRole } from "../helpers/checkRole";
import { RoleError } from "../errors/role.error";
import { NotUserError } from "./errors/notUser.error";
import { ChangeUserError } from "./errors/changeUser.error";
import { DeleteUserError } from "./errors/deleteUser.error";
import multer from "multer";
import path from 'path';

const userController = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../',  'public', 'avatars'))
    },

    filename: function (req, file, cb) {
        const { login } = req.query;

        if(login) {
            const extension =  file.originalname.slice(file.originalname.lastIndexOf('.'));
            req.query.avatar = login.toString() + extension;
           
            cb(null, req.query.avatar);
        }
    },    
});

const maxSizeFile = 1024 * 1024 * 10; // 10Mb
const upload = multer({ storage: storage, limits: { fileSize: maxSizeFile} });

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
    
    const {payload: { role, login } } = req.body;

    if (checkRole(['ADMIN', 'DESIGNER', 'CLIENT'], role)) {

        let param: string = login;
        
        if(req.query.login) {
            param = req.query.login.toString();
        }

        read(param)
        .then((user) => res.status(200).send(user))
        .catch((err: NotUserError) => res.status(404).send(err.message));
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});

// изменения, которые может внести администратор
userController.put('/update', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;

    if (checkRole(['ADMIN'], role)) {
        change(req.body)
        .then(() => res.status(200).send())
        .catch((err: ChangeUserError) => res.status(400).send(err.message));
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});


userController.put('/update/avatar', upload.single('avatar'),  (req: Request, res: Response) => {
    
    const { avatar, login } = req.query;

    if(avatar && login) {

        updateAvatar(avatar.toString(), login.toString())
        .then(() => res.status(200).send())
        .catch(() => res.status(400).send());       
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


userController.get('/read/participants_object', (req: Request, res: Response) => {
    
    const {payload: { role, login } } = req.body;

    if (checkRole(['ADMIN'], role)) {
        const id_object = req.query.id_object;

        if(id_object) {
            readParticipants(id_object.toString())
            .then((users) => res.status(200).send(users))
        }
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