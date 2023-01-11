export class AthoristaionError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Пользователь не авторизован в системе';
    }
}