const BaseError = require('../BaseError');


module.exports = class PlayerNotRegisteredError extends BaseError {
    constructor(playerid) {
        super(`User ${playerId} is not registered`, 'PLAYER_NOT_REGISTERED', { playerId });
    }
};
