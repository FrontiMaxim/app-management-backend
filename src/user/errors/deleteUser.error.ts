export class DeleteUserError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось удалить пользвоателя';
    }
}