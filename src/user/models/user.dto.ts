import { CommentDTO } from "../../comment/models/comment.dto";
import { ObjectDTO } from "../../object/models/object.dto";
import { SessionDTO } from "../../session/models/session.dto";
import { TaskDTO } from "../../task/models/task.dto";

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