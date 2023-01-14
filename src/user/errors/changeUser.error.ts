export class ChangeUserError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось сохранить пользвоателя';
    }
}