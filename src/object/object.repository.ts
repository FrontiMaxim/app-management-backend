import { IncomingMessage } from "http";
import prisma from "../prisma";
import { ObjectDTO } from "./object.dto";

export const getObjectByAlternateKeys = async (object: ObjectDTO): Promise<ObjectDTO | null> => {

    if(object.apartment) {
        return await prisma.object.findUnique({
            where: {
               city_street_house_apartment_note: {
                city: object.city,
                street: object.street,
                house: object.house,
                apartment: object.apartment,
                note: object.note
               }
            }
        });
    } else {
        return await prisma.object.findUnique({
            where: {
               city_street_house_note: {
                city: object.city,
                street: object.street,
                house: object.house,
                note: object.note
               }
            }
        });
    }

    
};


export const saveObject = async (object: ObjectDTO) => {
    return await prisma.object.create({
        data: {
            ...object,
            users: {
                connect: object.users?.map(user => ({id_user: user.id_user}))
            }
        }
    });
};


export const getObjectsByIdUser = async (id_user: string): Promise<ObjectDTO[] | null> => {

    return await prisma.object.findMany({
        where: {
            users: {
                some: {
                    id_user: {
                        equals: id_user
                    }
                }
            }
        }, 
        include: {
            users: true
        }
    });
}


export const getObjectsById = async (id_object: string): Promise<ObjectDTO | null> => {

    return await prisma.object.findUnique({
        where: {
            id_object
        }
    });
}


export const changeObject = async (object: ObjectDTO): Promise<ObjectDTO> => {

    return await prisma.object.update({
        where: {
            id_object: object.id_object
        },
        data: {
            city: {
                set: object.city
            },
            street: {
                set: object.street
            },
            house: {
                set: object.house
            },
            apartment: {
                set: object.apartment
            },
            note: {
                set: object.note
            },
            client: {
                set: object.client
            },
            data_start: {
                set: object.data_start
            },
            users: {
                set: object.users?.map(user => ({id_user: user.id_user}))
            }
        }, 
        include: {
            users: true
        } 
    });
};


export const removeObject = async (id_object: string): Promise<ObjectDTO> => {
    return prisma.object.delete({
        where: {
            id_object
        }
    })
}