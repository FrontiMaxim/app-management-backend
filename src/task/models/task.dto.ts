import { CommentDTO } from "../../comment/models/comment.dto";
import { ObjectDTO } from "../../object/models/object.dto";
import { ResourceDTO } from "../../resource/models/resource.dto";
import { UserDTO } from "../../user/models/user.dto";
import { StatusDTO } from "./status.dto";

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