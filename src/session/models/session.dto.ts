import { UserDTO } from "../../user/models/user.dto";

export class SessionDTO {
    id_session: string; 
    date: string;
    time_start: string;
    time_end: string | null;
    user: UserDTO;
}