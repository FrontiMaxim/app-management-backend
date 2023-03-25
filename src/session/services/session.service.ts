import { Session } from "@prisma/client";
import { changeSession, changedStatusOnline, getSessionById, getUserByIdForSession, getUserByLoginForSession, saveSession } from "../repositories/session.repository"
import { v4 as uuidv4 } from 'uuid';

// открытие сессии (создание) и передача в контроллер
export const openSession = async (login: string): Promise<Session | null> => {
    const user = await getUserByLoginForSession(login);
    
    if(user) {
        const newSession = await saveSession({
            id_session: uuidv4(),
            date: new Date().toDateString(),
            time_start: new Date().toTimeString(),
            time_end: null,
            user,
        });

        // меняем статус клиента на онлайн
        await changedStatusOnline(user.id_user, true);

        return newSession
    } else {
        return null;
    }
}

// закрытие сессии
export const closeSession = async (session: Session): Promise<void> => {     

    const { id_session, id_user } = session;
    const time = new Date().toTimeString();

    // изменяем время окончания сессии
    await changeSession(id_session, time);

     // меняем статус клиента на оффлайн
    await changedStatusOnline(id_user, false);
            
}



