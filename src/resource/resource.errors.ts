export class ResourceCreateError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось создать ресурс в базе данных';
    }
}

export class ResourceDeleteError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось удалить ресурс';
    }
}




