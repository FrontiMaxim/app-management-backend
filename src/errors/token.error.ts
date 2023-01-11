export class TokenError extends Error {

    message: string;

    constructor() {
        super();
        this.message = 'Token имеет неверную сигнатуру';
    }
}