import APIError from './api-error.js';

export default class AlreadyExistsError extends APIError {
    constructor(message: string, field: string) {
        super(message, 111, { field });
    }
}
