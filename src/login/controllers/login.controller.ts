import { Router } from "express";
import { Request, Response } from "express";
import { LoginError } from "../errors/login.error";
import { login } from "../services/login.service";
import { LoginDTO } from "../models/login.dto";

const loginController = Router();

loginController.post('/', (req: Request<{}, {}, LoginDTO>, res: Response) => {
    login(req.body)
        .then((token: string) => res.send({token}))
        .catch((err: LoginError) => res.status(404).send(err.message));
});

export default loginController;