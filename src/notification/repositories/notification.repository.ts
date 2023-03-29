import prisma from "../../prisma";
import { NotificationDTO } from "../models/notification.dto";
import { NotificationWithoutUserDTO } from "../models/notificationWithoutUser.dto";


export const getAllNotificationByLoginUser = async (login: string): Promise<NotificationWithoutUserDTO[]> => {
    return await prisma.notification.findMany({
        where: {
            user: {
                login
            },
            is_watch: false
        },
        include: {
            task: {
                include: {
                    status: true,
                }
            }
        },
        orderBy: {
            data: 'desc'
        }
    });
};


export const getAllNotificationByIdTask = async (id_task: string, id_user: string): Promise<NotificationWithoutUserDTO[]> => {
    return await prisma.notification.findMany({
        where: {
            id_task,
            is_watch: false,
            id_user
        },
        include: {
            task: {
                include: {
                    status: true,
                }
            }
        }
    });
};


export const saveNotification = async (notification: NotificationDTO): Promise<void> => {
    await prisma.notification.create({
        data: {
            ...notification
        }
    })
};


export const changeNotification = async (id_notification: string): Promise<void> => {
    await prisma.notification.update({
        where: {
            id_notification
        },
        data: {
            is_watch: {
                set: true
            }
        }
    })
};