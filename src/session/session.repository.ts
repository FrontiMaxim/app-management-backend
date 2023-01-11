import { SessionDTO } from "./session.dto";
import prisma from "../prisma";
import { UserDTO } from "../user/user.dto";
import { Session, User } from "@prisma/client";

export const getUserByLoginForSession = async (login: string): Promise<UserDTO | null> => {

    return await prisma.user.findUnique({
        where: {
           login
        }
    });
};


export const getUserByIdForSession = async (id_user: string): Promise<UserDTO | null> => {

    return await prisma.user.findUnique({
        where: {
           id_user
        }
    });
};


export const saveSession = async (newSession: SessionDTO): Promise<Session> => {
    return await prisma.session.create({
        data: {
            ...newSession,
            user: {
                connect: { id_user: newSession.user.id_user }
            }
        }
    })
}


export const getSessionById = async (id_session: string): Promise<Session | null> => {
    return await prisma.session.findUnique({
        where: {
            id_session
        }
    })
}


export const changeSession = async (id_session: string, time: string): Promise<void> => {

    await prisma.session.update({
        where: {
            id_session
        },
        data: {
           time_end: {
            set: time
           }
        },
    })
}


export const changedStatusOnline = async (id_user: string, valueStatus: boolean): Promise<void> => {
    await prisma.user.update({
        where: {
            id_user: id_user
        },
        data: {
            is_online: {
               set: valueStatus
            }
        }
    })
}


