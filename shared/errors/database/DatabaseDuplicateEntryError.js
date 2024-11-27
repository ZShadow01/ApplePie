const DatabaseError = require('./DatabaseError');


module.exports = class DatabaseDuplicateEntryError extends DatabaseError {
    constructor(key) {
        super('Duplicate entry detected', { key });
        this.code = 'DUPLICATE_ENTRY_ERROR';
    }
};
