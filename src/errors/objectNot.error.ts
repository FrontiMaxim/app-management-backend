export class ObjectNotError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данного объекта не существует';
    }
}