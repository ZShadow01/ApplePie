import PlayerService from './PlayerService.js';
// import ConnectorError from '../errors/ConnectorError.js';
import HttpError from '../errors/http/HttpError.js';

export default class ServerConnector {
    public readonly players: PlayerService;

    constructor(url: string) {
        this.players = new PlayerService(`${url}/api`);
    }

    public static async fetch(url: string, init?: RequestInit) {
        let res;

        try {
            res = await fetch(url, init);
        } catch (err) {
            throw new HttpError(
                'Fetch failed: Server might be offline or unreachable',
                err
            );
        }

        const json = await res.json();

        if (!res.ok) {
            throw new HttpError('The server returned an error', json);
            // throw new ConnectorError(json['error'].message, json['error'].code);
        }

        return json;
    }
}
