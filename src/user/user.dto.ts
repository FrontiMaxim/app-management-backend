import { SessionDTO } from "../session/session.dto";
import { RoleDTO } from "../role/role.dto";

export class UserDTO {
    id_user: string;
    name: string;
    login: string;
    password: string;
    is_online?: boolean;
    avatar: string;
    roles?: RoleDTO[];
    sessions?: SessionDTO[];
}