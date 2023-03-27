import { getObjectByIdTask } from "../../object/repositories/object.repository";
import { NotificationDTO } from "../models/notification.dto";
import { NotificationWithoutUserDTO } from "../models/notificationWithoutUser.dto";
import { changeNotification, getAllNotificationByIdTask, getAllNotificationByLoginUser, saveNotification } from "../repositories/notification.repository";

export const createNotification = async (newNotification: NotificationDTO): Promise<void> => {
    
    const id_task = newNotification.id_task;
    const object = await getObjectByIdTask(id_task);

    if(object) {
        const participants = object.users?.filter(user => user.id_user !== newNotification.id_user);

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


export const updateNotification = async (id_task: string): Promise<void> => {

    console.log(id_task)

    const notifications = await getAllNotificationByIdTask(id_task);

    if(notifications) {
        for(let notification of notifications) {
            await changeNotification(notification.id_notification);
        }
    }
    
}
