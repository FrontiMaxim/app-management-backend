import { Router } from "express";
import { Request, Response } from "express";
import { checkRole } from "../../helpers/checkRole";
import { createNotification, readNotifications, updateNotification } from "../services/notification.service";

const notificationController = Router();

notificationController.post('/create', (req: Request, res: Response) => {
    const {payload: { role } } = req.body;

    checkRole(['DESIGNER', 'CLIENT', 'ADMIN'], role, res);

    delete req.body.payload;

    createNotification(req.body)
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
    
    const id_task = req.query.id_task;

    checkRole(['DESIGNER', 'CLIENT', 'ADMIN'], role, res)

    delete req.body.payload;

    if(id_task) {
        updateNotification(id_task.toString())
            .then(() => res.status(200).send());
    }    
});

export default notificationController;