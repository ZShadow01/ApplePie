import BaseError from './base-error.js';

export default class UnknownError extends BaseError {
    constructor(message?: string) {
        super(message || 'An unknown error occurred');
    }
}
