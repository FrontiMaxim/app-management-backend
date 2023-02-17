import { changeAvatarByLogin, changeUser, deleteUser, getUser, getUsers, getUsersByIdObject, saveUser } from "./user.repository";
import bcrypt from 'bcryptjs';
import { UserDTO } from "./user.dto";
import { RegistrationError } from "./errors/registration.error";
import { NotUserError } from "./errors/notUser.error";
import { ChangeUserError } from "./errors/changeUser.error";
import { DeleteUserError } from "./errors/deleteUser.error";

export const create = async (newUser: UserDTO): Promise<void> => {
    const user = await getUser(newUser.login);

    if(user) {
        throw new RegistrationError();
    } else {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword: string = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;
        newUser.avatar = 'avatar.png';
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

export const change = async (user: UserDTO): Promise<void> => {

    if (user.password !== '') {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword: string = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
    }
    
    try {
        await changeUser(user);
    } catch {
        throw new ChangeUserError();
    }
}


export const readParticipants = async (id_object: string): Promise<UserDTO[]> => {
    return await getUsersByIdObject(id_object);
}


export const remove = async(id_user: string): Promise<void> => {
    const user = await deleteUser(id_user);
    if(!user) {
        throw new DeleteUserError();
    }
}

export const updateAvatar = async(avatar: string, login: string): Promise<void> => {
    await changeAvatarByLogin(avatar, login);
}


