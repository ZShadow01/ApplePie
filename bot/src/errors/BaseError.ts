export default class BaseError extends Error {
    public readonly code: string | null;

    constructor(message: string, options?: { code?: string }) {
        super(message);
        this.name = this.constructor.name;
        this.code = options?.code || null;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
