import BaseError from './base-error.js';

export default class APIError extends BaseError {
    public readonly code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}
