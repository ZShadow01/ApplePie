const BaseError = require('../BaseError');


module.exports = class PlayerAlreadyRegisteredError extends BaseError {
    constructor(playerId) {
        super('You are already registered as a player', 'PLAYER_ALREADY_REGISTERED', { playerId });
    }
};
