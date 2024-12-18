module.exports = class TeamModel {
    constructor(team, members) {
        this.id = team.id;
        this.name = team.name;
        this.leaderId = team.leader_id;
        this.createdAt = team.created_at;
        this.members = members || [];
    }
};
