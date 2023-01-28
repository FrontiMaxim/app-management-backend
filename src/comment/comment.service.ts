import { CommentDTO } from "./comment.dto";
import { CommentCreateError } from "./comment.errors";
import { getComments, saveComment } from "./comment.repository";

export const createComment = async (newComment: CommentDTO): Promise<void> => {
    try {
        await saveComment(newComment);
    } catch {
        throw new CommentCreateError();
    }
}


export const readComments = async (id_task: string) => {
    const comments = await getComments(id_task);

    if(comments) {
        return comments;
    } else {
        return [];
    }
}


