const BaseError = require("./BaseError");


module.exports = class CommandError extends BaseError {
    constructor(message, code, metadata = null) {
        super(`Command failed: ${message}`, code, metadata);
    }
};
