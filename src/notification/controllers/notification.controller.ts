import { Router } from "express";
import { Request, Response } from "express";
import { checkRole } from "../../helpers/checkRole";
import { createNotification, readNotifications } from "../services/notification.service";
import { changeNotification } from "../repositories/notification.repository";

const notificationController = Router();

notificationController.post('/create', (req: Request, res: Response) => {
    const {payload: { role, login } } = req.body;

    checkRole(['DESIGNER', 'CLIETN'], role, res);

    delete req.body.payload;

    createNotification(req.body, login)
        .then(() => res.status(201).send());
    
});


notificationController.get('/read/all', (req: Request, res: Response) => {
    
    const {payload: { login } } = req.body;

    delete req.body.payload;

    readNotifications(login)
        .then((notifications) => res.status(200).send(notifications));
    
});


notificationController.put('/update', (req: Request, res: Response) => {

    const {payload: { role } } = req.body;
    
    const id_notifiction = req.query.id_notifiction;

    checkRole(['DESIGNER', 'CLIETN'], role, res)

    delete req.body.payload;

    if(id_notifiction) {
        changeNotification(id_notifiction.toString())
            .then(() => res.status(200).send());
    }    
});

export default notificationController;