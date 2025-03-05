import PlayerService from './PlayerService.js';
import ConnectorError from '../errors/ConnectorError.js';

export default class ServerConnector {
    public readonly players: PlayerService;

    constructor(url: string) {
        this.players = new PlayerService(`${url}/api`);
    }

    public static async fetch(url: string, init?: RequestInit) {
        const res = await fetch(url, init);
        const json = await res.json();

        if ('error' in json) {
            throw new ConnectorError(json['error'].message, json['error'].code);
        }

        return json;
    }
}
