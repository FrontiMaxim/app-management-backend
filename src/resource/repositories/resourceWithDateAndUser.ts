import { UserDTO } from "../../user/models/user.dto";

export class ResourceWithDateAndUserDTO {
    id_resource: string;
    originalName: string;
    storageName: string;
    id_task: string;
    user: UserDTO;
    date: Date;
}