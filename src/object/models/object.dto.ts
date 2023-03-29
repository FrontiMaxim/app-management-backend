import { TaskDTO } from "../../task/models/task.dto";
import { UserDTO } from "../../user/models/user.dto";

export class ObjectDTO {
    id_object: string;
    city: string;
    street: string;
    house: string;
    apartment: number | null;
    note: string;
    data_start: string;
    users?: UserDTO[];
    tasks?: TaskDTO[];
}