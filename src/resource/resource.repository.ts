import prisma from "../prisma";
import { ResourceDTO } from "./resource.dto";

export const saveResource = async (originalName: string, storageName: string, id_task: string): Promise<void> => {
    await prisma.resource.create({
        data: {
            originalName,
            storageName,
            task: {
                connect: {id_task}
            }
        }
    })
}

export const getResourcesByIdTask = async (id_task: string): Promise<ResourceDTO[]> => {
    return prisma.resource.findMany({
        where: {
            id_task
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
