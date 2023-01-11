import { Router } from "express";
import { Request, Response } from "express";
import { openSession, closeSession } from "./session.service";

const sessionController = Router();

// конроллер для открытия сессии
sessionController.get('/open', async (req: Request, res: Response) => {
    const {payload: { login } } = req.body;
    const newSession = await openSession(login);

    if(newSession) {
        res.status(201).send(newSession);
    } else {
        res.status(400).send();
    }
});


// контроллер для закрытия сессии
sessionController.put('/close', async (req: Request, res: Response) => {

    delete req.body.payload;
    
    await closeSession(req.body);

    res.status(202).send();
});

export default sessionController;