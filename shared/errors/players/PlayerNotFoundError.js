const BaseError = require('../BaseError');


module.exports = class PlayerNotFoundError extends BaseError {
    constructor(playerName) {
        super(`Could not find player "${playerName}"`, 'PLAYER_NOT_FOUND', { playerName });
    }
};
