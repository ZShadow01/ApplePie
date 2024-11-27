module.exports = class PlayerModel {
    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.rating = player.rating;
        this.stats = {
            wins: player.wins,
            losses: player.losses
        };
        this.registeredAt = player.registered_at;
    }

    toDTO() {
        
    }
};
