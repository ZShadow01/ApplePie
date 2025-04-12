import APIError from './api-error.js';

export default class NameTakenError extends APIError {
    constructor(message: string, name: string) {
        super(message, 110, { name });
    }
}
