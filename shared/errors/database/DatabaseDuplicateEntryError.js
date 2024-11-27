const DatabaseError = require('./DatabaseError');


module.exports = class DatabaseDuplicateEntryError extends DatabaseError {
    constructor(key) {
        super('Duplicate entry detected', 'DUPLICATE_ENTRY_ERROR', { key });
    }
};
