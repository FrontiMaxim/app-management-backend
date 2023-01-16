export class ObjectRepeatError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данный объект уже существует в системе';
    }
}


export class ObjectUpdateError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данный объект не удалось изменить';
    }
}

export class ObjectDeleteError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данный объект не удалось удалить из системы';
    }
}

