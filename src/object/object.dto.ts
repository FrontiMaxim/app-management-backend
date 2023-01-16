import { SessionDTO } from "../session/session.dto";
import { UserDTO } from "../user/user.dto";

export class ObjectDTO {
    id_object: string;
    city: string;
    street: string;
    house: string;
    apartment: number | null;
    note: string;
    data_start: string;
    client: string;
    users?: UserDTO[];
    //tasks: TaskDTO[];
}