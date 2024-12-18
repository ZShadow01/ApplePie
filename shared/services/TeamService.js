const PieHubClient = require('../api/PieHubClient');


module.exports = {
    async create(leaderId, name) {
        return await PieHubClient.post('/team/create', {
            leaderId,
            name
        });
    },

    async findTeamById(id) {
        return await PieHubClient.get(`/team/${id}`);
    }
};
