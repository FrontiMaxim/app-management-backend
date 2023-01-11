import prisma from "../prisma";
import { UserDTO } from "../user/user.dto";

export const getUserWithRoles = async (login: string): Promise<UserDTO | null> => {

    return await prisma.user.findUnique({
        where: {
           login
        },
        include: {
            roles: true
        }
    });
};

