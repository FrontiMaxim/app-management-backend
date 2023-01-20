import { TaskDTO } from "../task/task.dto";

export class StatusDTO {
    id_status: number;
    name: string;
    tasks?: TaskDTO[];
}