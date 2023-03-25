import { TaskDTO } from "../../task/models/task.dto";
import { UserDTO } from "../../user/models/user.dto";

export class NotificationDTO {
    id_notification: string;
    is_watch: boolean;    
    data: Date;
    type: string;
    id_user: string;
    id_task: string;
}