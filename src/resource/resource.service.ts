import { ResourceDTO } from "./resource.dto";
import { ResourceCreateError, ResourceDeleteError } from "./resource.errors";
import { deleteResource, getResourcesByIdTask, saveResource } from "./resource.repository";
import path from 'path';
import fs from 'fs/promises';
import { getTaskById, updateTask } from "../task/task.repository";


const PATH = path.join(__dirname, '../',  'public', 'resources');

export const createResource = async (originalName: string, storageName: string, id_task: string): Promise<void> => {
    try {
        await saveResource(originalName, storageName, id_task);
        
        const task = await getTaskById(id_task);

        if(task) {
            if(  task.status.id_status === 1) {
                task.status.id_status = 2;
                await updateTask(task);
            }
        }
    } catch {
        throw new ResourceCreateError();
    }
}

export const readResources = async (id_task: string): Promise<ResourceDTO[]> => {
    const resources = await getResourcesByIdTask(id_task);

    if(resources) {
        return resources;
    } else {
       return [];
    }
}

export const removeResource = async(id_resource: string): Promise<void> => {

    try {
        const resource = await deleteResource(id_resource);
        await fs.unlink(path.join(PATH, resource.storageName));
    } catch {
        throw new ResourceDeleteError();
    }
}