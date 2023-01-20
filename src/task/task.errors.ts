export class TaskCreateError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось сохранить новую задачу в базу данных';
    }
}

export class TaskReadError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Такой задачи нет в базе данных';
    }
}

export class TaskUpdateError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось внести измнения в задачу';
    }
}

export class TaskDeleteError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось удалить задачу';
    }
}


export class TasksReadError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Таких задач в базе данных нет';
    }
}



