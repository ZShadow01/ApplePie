const BaseError = require('../BaseError');


module.exports = class TeamNameTakenError extends BaseError {
    constructor(name) {
        super('Team name is already taken', 'TEAM_NAME_TAKEN', { name });
    }
};
