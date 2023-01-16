import prisma from "../prisma";
import { UserDTO } from "./user.dto";

export const getUser = async (login: string): Promise<UserDTO | null> => {

    return await prisma.user.findUnique({
        where: {
           login
        }
    });
};


// получение списка пользователей без пользователя, который запросил данный список
export const getUsers = async (login: string): Promise<UserDTO[] | null> => {

    return await prisma.user.findMany({
        where: {
            NOT: {
                login
            }
        }
    })
}


export const saveUser = async (user: UserDTO) => {
    return await prisma.user.create({
        data: {
            ...user,
            sessions: {
                connect: []
            }, 
            objects: {
                connect: []
            }
        }
    });
};


export const changeUser = async (user: UserDTO): Promise<UserDTO> => {

    if (user.password !== '') {
        await prisma.user.update({
            where: {
                id_user: user.id_user
            },
            data: {
                password: {
                    set: user.password
                }
            }   
        });
    }

    return await prisma.user.update({
        where: {
            id_user: user.id_user
        },
        data: {
            name: {
                set: user.name
            },
            login: {
                set: user.login
            },
            role: {
                set: user.role
            }
        }   
    });
};


export const deleteUser = async (id_user: string): Promise<UserDTO> => {
    return prisma.user.delete({
        where: {
            id_user
        }
    })
}