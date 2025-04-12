import BaseError from './base-error.js';

export default class HttpError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}
