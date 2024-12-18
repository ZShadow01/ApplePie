const BaseError = require('../BaseError');


module.exports = class TeamNotExistError extends BaseError {
    constructor(teamId) {
        super('Team does not exist', 'TEAM_NOT_EXIST', { teamId });
    }
};
