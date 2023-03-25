import { Router } from "express";
import { Request, Response } from "express";
import { checkRole } from "../../helpers/checkRole";
import { createObject, deleteObject, readObjects, updateObject } from "../services/object.service";
import { ObjectDeleteError, ObjectRepeatError, ObjectUpdateError } from "../errors/object.errors";

const objectController = Router();

objectController.post('/create', (req: Request, res: Response) => {
    const {payload: { role } } = req.body;

    (checkRole(['ADMIN'], role, res)) ;

    delete req.body.payload;

    createObject(req.body)
        .then(() => res.status(201).send())
        .catch((err: ObjectRepeatError) => res.status(400).send(err.message));
});


objectController.get('/read/all', (req: Request, res: Response) => {
    
    delete req.body.payload;

    const id_user = req.query.id_user;

    if( id_user ) {
        readObjects(id_user.toString())
            .then(objects => res.status(200).send(objects));
    }
});


objectController.put('/update', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;

    checkRole(['ADMIN'], role, res);

    delete req.body.payload;

    updateObject(req.body)
        .then(() => res.status(200).send())
        .catch((err: ObjectUpdateError) => res.status(400).send(err.message));
});


objectController.delete('/delete', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;

    checkRole(['ADMIN'], role, res);

    delete req.body.payload;

    const id_object = req.query.id_object;

    if (id_object) {
        deleteObject(id_object.toString())
            .then(() => res.status(200).send())
            .catch((err: ObjectDeleteError) => res.status(400).send(err.message));
    }
});

export default objectController;