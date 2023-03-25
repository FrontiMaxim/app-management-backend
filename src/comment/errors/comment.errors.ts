export class CommentCreateError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Не удалось сохранить новый комментарий в базу данных';
    }
}




