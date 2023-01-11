export class RoleError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Данный пользователь не имеет доступа к данной функции';
    }
}