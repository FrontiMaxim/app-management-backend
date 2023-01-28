import { TaskDTO } from "../task/task.dto";
import { UserDTO } from "../user/user.dto";

export class CommentDTO {
    id_comment: string;
    content: string;
    data: string;
    time: string;
    task: TaskDTO;
    user: UserDTO;
}