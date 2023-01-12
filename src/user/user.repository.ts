import prisma from "../prisma";
import { UserDTO } from "./user.dto";

export const getUser = async (login: string): Promise<UserDTO | null> => {

    return await prisma.user.findUnique({
        where: {
           login
        }
    });
};


export const saveUser = async (user: UserDTO) => {
    return await prisma.user.create({
        data: {
            ...user,
            sessions: {
                connect: user.sessions
            }
        }
    });
};