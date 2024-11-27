const BaseError = require('../BaseError');


module.exports = class PlayerNameTakenError extends BaseError {
    constructor(playerName) {
        super(`The name "${playerName}" is already taken`, 'PLAYER_NAME_TAKEN', { playerName });
    }
};
