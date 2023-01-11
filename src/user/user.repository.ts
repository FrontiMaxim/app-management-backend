import prisma from "../prisma";
import { UserDTO } from "./user.dto";

export const getUser = async (login: string, includeRoles: boolean = false): Promise<UserDTO | null> => {

    return await prisma.user.findUnique({
        where: {
           login
        },
        include: {
            roles: includeRoles
        }
    });
};


export const saveUser = async (user: UserDTO) => {
    return await prisma.user.create({
        data: {
            ...user,
            roles: {
                connect: user.roles
            },
            sessions: {
                connect: user.sessions
            }
        }
    });
};