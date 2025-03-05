import ServerConnector from './ServerConnector.js';

export default class PlayerService {
    private rootUrl: string;

    constructor(rootUrl: string) {
        this.rootUrl = rootUrl;
    }

    public async create(discordId: string, username: string) {
        await ServerConnector.fetch(`${this.rootUrl}/players/register`, {
            method: 'POST',
            body: JSON.stringify({ discordId, username }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get(discordId: string) {
        const res = await ServerConnector.fetch(
            `${this.rootUrl}/players/${discordId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return res.player;
    }
}
