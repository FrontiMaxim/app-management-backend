import prisma from "../../prisma";
import { UserDTO } from "../models/user.dto";

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


export const saveUser = async (user: UserDTO): Promise<void> => {
    await prisma.user.create({
        data: {
            ...user,
            sessions: {
                connect: []
            }, 
            objects: {
                connect: []
            }, 
            tasks: {
                connect: []
            },
            comments: {
                connect: []
            }
        }
    });
};


export const changeUser = async (user: UserDTO): Promise<void> => {

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

    await prisma.user.update({
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
    return await prisma.user.delete({
        where: {
            id_user
        }
    })
}


export const getUsersByIdObject = async (id_object: string): Promise<UserDTO[]> => {
    return await prisma.user.findMany({
        where: {
            objects: {
                some: {
                    id_object
                }
            }
        }
    });
}


export const changeAvatarByLogin = async (avatar: string, login: string): Promise<void> => {

    await prisma.user.update({
        where: {
            login
        },
        data: {
            avatar: {
                set: avatar
            }
        }
    });
}