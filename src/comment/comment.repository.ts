import prisma from "../prisma"
import { CommentDTO } from "./comment.dto";

export const saveComment = async (newComment: CommentDTO): Promise<void> => {
    await prisma.comment.create({
        data: {
            ...newComment,
            user: {
                connect: {id_user: newComment.user.id_user}
            },
            task: {
                connect: {id_task: newComment.task.id_task}
            }
        }
    });
}

export const getComments = async (id_task: string) => {
    return prisma.comment.findMany({
        where: {
            id_task
        }, 
        include: {
            user: true
        }
    })
}