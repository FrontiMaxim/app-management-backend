import { Router } from "express";
import { Request, Response } from "express";
import { createComment, readComments } from "../services/comment.service";
import { CommentCreateError } from "../errors/comment.errors";

const commentController = Router();

commentController.post('/create', (req: Request, res: Response) => {

    delete req.body.payload;
    
    createComment(req.body)
    .then(() => res.status(201).send())
    .catch((err: CommentCreateError) => res.status(404).send(err.message));
});


commentController.get('/read/comments', (req: Request, res: Response) => {
    const id_task = req.query.id_task;

    if(id_task) {
        readComments(id_task.toString())
            .then((task) => res.status(200).send(task));
    } else {
        res.status(404).send();
    }
});

export default commentController;