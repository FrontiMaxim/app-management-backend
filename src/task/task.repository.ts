import prisma from "../prisma"
import userController from "../user/user.controller";
import { TaskDTO } from "./task.dto"

export const getTaskById = async (id_task: string): Promise<TaskDTO | null> => {
    return await prisma.task.findUnique({
        where: {
            id_task
        }, 
        include: {
            status: true,
            user: true,
            resources: true,
            object: true
        }
    });
}


export const saveTask = async (newTask: TaskDTO): Promise<void> => {
    await prisma.task.create({
        data: {
            ...newTask,
            resources: {
                connect: []
            },
            user: {
                connect: newTask.user ? { id_user: newTask.user.id_user } : undefined
            },
            object: {
                connect: { id_object: newTask.object.id_object }
            },
            status: {
                connect: { id_status: newTask.status.id_status }
            },
            comments: {
                connect: []
            }
        }
    });
}


export const updateTask = async (changeTask: TaskDTO): Promise<void> => {
    await prisma.task.update({
        where: {
            id_task: changeTask.id_task
        }, 
        data: {
            name: {
                set: changeTask.name
            },
            deadline: {
                set: changeTask.deadline
            },
            description: {
                set: changeTask.description
            },
            user: {
                connect: changeTask.user ? { id_user: changeTask.user.id_user } : undefined
            },
            object: {
                connect: { id_object: changeTask.object.id_object }
            },
            status: {
                connect: { id_status: changeTask.status.id_status }
            }
        }
    });
}

export const deleteTask = async (id_task: string): Promise<TaskDTO | null> => {
    return prisma.task.delete({
        where: {
            id_task
        },
        include: {
            object: true,
            status: true,
        }
    });
}


export type TParam = {
    id_user?: string;
    id_object?: string;
}

export const getTasks = async ({id_user, id_object}: TParam): Promise<TaskDTO[] | null> => {

    if (id_user) {
        return prisma.task.findMany({
            where: {
                user: {
                    id_user: id_user
                }
            },
            include: {
                object: true,
                status: true,
            }
        });
    } else if (id_object) {
        return prisma.task.findMany({
            where: {
                object: {
                    id_object: id_object
                }
            },
            include: {
                object: true,
                status: true,
                user: true
            }
        });
    } else {
        return null;
    }
}