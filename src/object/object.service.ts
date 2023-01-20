import { ObjectDTO } from "./object.dto";
import { ObjectDeleteError, ObjectRepeatError, ObjectUpdateError } from "./object.errors";
import { changeObject, getObjectByAlternateKeys, getObjectsByIdUser, removeObject, saveObject } from "./object.repository";

export const createObject = async (newObject: ObjectDTO): Promise<void> => {
    const object = await getObjectByAlternateKeys(newObject);

    if(object) {
       throw new ObjectRepeatError();
    } else {
       await saveObject(newObject);
    }
}


export const readObjects = async (id_user: string): Promise<ObjectDTO[]> => {

    const objects = await getObjectsByIdUser(id_user);

    if(objects) {
        return objects;
    } else {
        return [];
    }
}

export const updateObject = async (changedObject: ObjectDTO): Promise<void> => {

    try {
        await changeObject(changedObject);
    } catch {
        throw new ObjectUpdateError();
    }
   
}


export const deleteObject = async(id_object: string): Promise<void> => {
    const object = await removeObject(id_object);
    if(!object) {
        throw new ObjectDeleteError();
    }
}


