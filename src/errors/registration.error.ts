export class RegistrationError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данный пользователь уже существует';
    }
}