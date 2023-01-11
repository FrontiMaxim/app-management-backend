export class ObjectRepeatError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данный объект уже существует';
    }
}