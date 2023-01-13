export class NotUserError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данного пользователя не существует';
    }
}