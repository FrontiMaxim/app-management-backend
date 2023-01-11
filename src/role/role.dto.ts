import { UserDTO } from "../user/user.dto";

export class RoleDTO {
    id_role: number;
    name:    string;
    users?:  UserDTO[];
}