const PieHubClient = require('../api/PieHubClient');


module.exports = {
    async findPlayerById(id) {
        return await PieHubClient.get(`/player/${id}`);
    },

    async findPlayerByName(name) {
        return await PieHubClient.get(`/player/search/${name}`);
    },

    async register(id, name) {
        return await PieHubClient.post('/player/register', {
            id,
            name
        });
    }
};
