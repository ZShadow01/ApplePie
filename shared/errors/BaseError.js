module.exports = class BaseError extends Error {
    constructor(message, code, metadata = null) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        this.metadata = metadata;

        Error.captureStackTrace(this, this.constructor);
    }
};
