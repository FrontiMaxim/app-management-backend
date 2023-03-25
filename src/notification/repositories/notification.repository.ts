import prisma from "../../prisma";
import { NotificationDTO } from "../models/notification.dto";
import { NotificationWithoutUserDTO } from "../models/notificationWithoutUser.dto";


export const getAllNotificationByLoginUser = async (login: string): Promise<NotificationWithoutUserDTO[]> => {
    return await prisma.notification.findMany({
        where: {
            user: {
                login
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