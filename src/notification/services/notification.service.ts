import { getObjectByIdTask } from "../../object/repositories/object.repository";
import { NotificationDTO } from "../models/notification.dto";
import { NotificationWithoutUserDTO } from "../models/notificationWithoutUser.dto";
import { changeNotification, getAllNotificationByLoginUser, saveNotification } from "../repositories/notification.repository";

export const createNotification = async (newNotification: NotificationDTO, login: string): Promise<void> => {
    
    const id_task = newNotification.id_task;
    const object = await getObjectByIdTask(id_task);

    if(object) {
        const participants = object.users?.filter(user => user.login !== login);

        if(participants) {
            for(let participant of participants) {
                newNotification.id_user = participant.id_user;
                saveNotification(newNotification);
            }
        }
    }
}


export const readNotifications = async (login: string): Promise<NotificationWithoutUserDTO[]> => {
    return await getAllNotificationByLoginUser(login);
}


export const updateNotification = async (id_notifiction: string): Promise<void> => {
    await changeNotification(id_notifiction)
}
