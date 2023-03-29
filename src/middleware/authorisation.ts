import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { TokenError } from '../errors/token.error';
import { AthoristaionError } from '../errors/authorisation.error';

export const authorisation = (req: Request, res: Response, next: NextFunction) => {
    const authorisation = req.headers.authorization;
    
    if(authorisation) {
        const token = authorisation.split(' ')[1];

        try {
            const payload = jwt.verify(token, process.env.SECRET!);
            req.body = {
                ...req.body,
                payload
            };
        } catch(err) {
            return res.status(400).send(new TokenError().message);
        }
       
    } else {
        return res.status(403).send(new AthoristaionError().message);
    }
    
    next();
}