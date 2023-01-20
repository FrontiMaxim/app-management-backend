import { Router } from "express";
import { Request, Response } from "express";
import { checkRole } from "../helpers/checkRole";
import { changeTask, createTask, readTask, readTasks, removeTask } from "./task.service";
import { TaskCreateError, TaskDeleteError, TaskReadError, TaskUpdateError, TasksReadError } from "./task.errors";
import { RoleError } from "../errors/role.error";

const taskController = Router();

taskController.post('/create', (req: Request, res: Response) => {
    const {payload: { role } } = req.body;

    if (checkRole(['ADMIN'], role)) {

        delete req.body.payload;

        createTask(req.body)
        .then(() => res.status(201).send())
        .catch((err: TaskCreateError) => res.status(404).send(err.message));
    } else {
        res.status(403).send(new RoleError().message);
    }
});


taskController.get('/read', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;

    if (checkRole(['ADMIN', 'DESIGNER', 'CLIENT'], role)) {

        const id_task = req.query.id_task;

        if(id_task) {
            readTask(id_task.toString())
                .then((task) => res.status(200).send(task))
                .catch((err: TaskReadError) => res.status(404).send(err.message));
        }
        
    } else {
        res.status(403).send(new RoleError().message);
    }
});



taskController.put('/update', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;

    if (checkRole(['ADMIN'], role)) {
        changeTask(req.body)
        .then((changedTask) => res.status(200).send(changedTask))
        .catch((err: TaskUpdateError) => res.status(400).send(err.message));
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});


taskController.get('/read/tasks', (req: Request, res: Response) => {
    
    const {payload: { role, login } } = req.body;

    const { id_object, id_user } = req.query;

    if (checkRole(['ADMIN', 'DESIGNER', 'CLIENT'], role)) {
        readTasks({ id_user: id_user?.toString(), id_object: id_object?.toString()})
        .then((tasks) => res.status(200).send(tasks))
        .catch((err: TasksReadError) => res.status(404).send(err.message));
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});

taskController.delete('/delete', (req: Request, res: Response) => {
    
    const {payload: { role } } = req.body;
    
    if (checkRole(['ADMIN'], role)) {
        const id_task = req.query.id_task;
        if (id_task) {
            removeTask(id_task.toString())
            .then(() => res.status(200).send())
            .catch((err: TaskDeleteError) => res.status(400).send(err.message));
        }
       
    } else {
        res.status(403).send(new RoleError().message);
    }
   
});

export default taskController;