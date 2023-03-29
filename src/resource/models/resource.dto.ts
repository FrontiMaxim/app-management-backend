import { TaskDTO } from "../../task/models/task.dto";

export class ResourceDTO {
    id_resource: string;
    originalName: string;
    storageName: string;
    date: Date;
    id_task: string;
    id_user: string;
}