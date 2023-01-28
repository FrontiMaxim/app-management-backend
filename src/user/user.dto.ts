import { CommentDTO } from "../comment/comment.dto";
import { ObjectDTO } from "../object/object.dto";
import { SessionDTO } from "../session/session.dto";
import { TaskDTO } from "../task/task.dto";

export class UserDTO {
    id_user: string;
    name: string;
    login: string;
    password: string;
    is_online?: boolean;
    avatar: string;
    role: string;
    sessions?: SessionDTO[];
    objects?: ObjectDTO[];
    tasks?: TaskDTO[];
    comments?: CommentDTO[]; 
}