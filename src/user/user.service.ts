import { getUser, getUsers, saveUser } from "./user.repository";
import bcrypt from 'bcryptjs';
import { UserDTO } from "./user.dto";
import { RegistrationError } from "./errors/registration.error";
import { NotUserError } from "./errors/notUser.error";

export const create = async (newUser: UserDTO): Promise<void> => {
    const user = await getUser(newUser.login);

    if(user) {
        throw new RegistrationError();
    } else {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword: string = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;
        newUser.avatar = '/avatars/avatar.png';
        await saveUser(newUser);
    }
}

export const read = async (login: string): Promise<UserDTO | void> => {
    
    const user = await getUser(login);

    if(user) {
        return user;
    } else {
        throw new NotUserError();
    } 
}

export const readUsers = async (login: string): Promise<UserDTO[]> => {
    
    const users = await getUsers(login);

    if(users) {
        users.map(user => {
            user.password = '';
        })
        return users;
    } else {
        return [];
    } 
}


