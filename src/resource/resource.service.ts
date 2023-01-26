import { ResourceDTO } from "./resource.dto";
import { ResourceCreateError, ResourceDeleteError } from "./resource.errors";
import { deleteResource, getResourcesByIdTask, saveResource } from "./resource.repository";
import path from 'path';
import fs from 'fs/promises';


const PATH = path.join(__dirname, '../',  'public', 'resources');

export const createResource = async (originalName: string, storageName: string, id_task: string): Promise<void> => {
    try {
        await saveResource(originalName, storageName, id_task);
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