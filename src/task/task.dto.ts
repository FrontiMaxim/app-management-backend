import { CommentDTO } from "../comment/comment.dto";
import { ObjectDTO } from "../object/object.dto";
import { ResourceDTO } from "../resource/resource.dto";
import { StatusDTO } from "../status/status.dto";
import { UserDTO } from "../user/user.dto";

export class TaskDTO {
    id_task: string;
    name: string;
    deadline: string;
    description: string;
    object: ObjectDTO;
    user?: UserDTO | null; 
    status: StatusDTO;
    comments?: CommentDTO[];
    resources?: ResourceDTO[];
}