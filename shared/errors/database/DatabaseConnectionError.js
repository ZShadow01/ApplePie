const DatabaseError = require('./DatabaseError');


module.exports = class DatabaseConnectionError extends DatabaseError {
    constructor(message, metadata = null) {
        super(message, metadata);
        this.code = 'DATABASE_CONNECTION_ERROR';
    }
};
