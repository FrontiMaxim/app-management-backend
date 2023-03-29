import prisma from "../../prisma";
import { ResourceDTO } from "../models/resource.dto";
import { ResourceWithDateAndUserDTO } from "./resourceWithDateAndUser";

export const saveResource = async (originalName: string, storageName: string, id_task: string, id_user: string): Promise<void> => {
    await prisma.resource.create({
        data: {
            originalName,
            storageName,
            date: new Date(Date.now()),
            task: {
                connect: {id_task}
            },
            user: {
                connect: {id_user}
            }
        }
    })
}

export const getResourcesByIdTask = async (id_task: string): Promise<ResourceWithDateAndUserDTO[]> => {
    return prisma.resource.findMany({
        where: {
            id_task
        },
        include: {
            user: true
        }
    })
}

export const deleteResource = async (id_resource: string): Promise<ResourceDTO> => {
    return prisma.resource.delete({
        where: {
            id_resource
        }
    });
}
