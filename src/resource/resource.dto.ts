import { TaskDTO } from "../task/task.dto";

export class ResourceDTO {
    id_resource: string;
    name: string;
    link: string;
    task?: TaskDTO;
}