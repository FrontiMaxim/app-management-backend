import { TaskDTO } from "../../task/models/task.dto";
import { UserDTO } from "../../user/models/user.dto";

export class CommentDTO {
    id_comment: string;
    content: string;
    data: string;
    time: string;
    task: TaskDTO;
    user: UserDTO;
}