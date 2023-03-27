import { TaskWithUserAndStatusDTO } from "../../task/models/taskWithoutTask.dto";

export class NotificationWithoutUserDTO {
    id_notification: string;
    is_watch: boolean;    
    data: Date;
    task: TaskWithUserAndStatusDTO;
}