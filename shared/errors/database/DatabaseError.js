const BaseError = require('../BaseError');


module.exports = class DatabaseError extends BaseError {
    constructor(message, metadata) {
        super(message, 'DATABASE_ERROR', metadata);
    }
};
