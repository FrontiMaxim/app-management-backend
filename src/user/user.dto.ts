import { ObjectDTO } from "../object/object.dto";
import { SessionDTO } from "../session/session.dto";

export class UserDTO {
    id_user: string;
    name: string;
    login: string;
    password: string;
    is_online?: boolean;
    avatar: string;
    role: string;
    sessions?: SessionDTO[];
    objects?: ObjectDTO[];
}