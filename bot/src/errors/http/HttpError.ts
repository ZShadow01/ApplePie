import BaseError from '../BaseError.js';

export default class HttpError extends BaseError {
    public readonly responseData: any;

    constructor(message: string, responseData: any) {
        super(message, { code: 'HTTP_ERROR' });
        this.responseData = responseData;
    }
}
