import BaseError from './base-error.js';

export default class UnknownError extends BaseError {
    constructor() {
        super('An unknown error occurred');
    }
}
