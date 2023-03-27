import { UserDTO } from "../../user/models/user.dto";
import { StatusDTO } from "./status.dto";

export class TaskWithUserAndStatusDTO {
    id_task: string;
    name: string;
    deadline: string;
    description: string;
    user?: UserDTO | null; 
    status: StatusDTO;
}