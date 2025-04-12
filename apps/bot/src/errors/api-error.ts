import BaseError from './base-error.js';

export default class APIError extends BaseError {
    public readonly code: number;
    public readonly details: Record<string, unknown> | null;

    constructor(
        message: string,
        code: number,
        details?: Record<string, unknown>
    ) {
        super(message);
        this.code = code;
        this.details = details || null;
    }
}
