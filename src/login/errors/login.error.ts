export class LoginError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данного пользователя в системе нет';
    }
}