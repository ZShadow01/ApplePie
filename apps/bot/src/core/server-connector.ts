import UnknownError from '../errors/unknown-error.js';
import HttpError from '../errors/http-error.js';
import APIError from '../errors/api-error.js';

export default class ServerConnector {
    constructor() {
        // TODO: websocket/socket.io connection to the server
    }

    static async request(
        url: string,
        options?: RequestInit
    ): Promise<Record<string, unknown>> {
        let res;

        try {
            res = await fetch(url, options);
        } catch (err) {
            if (err instanceof TypeError) {
                throw new HttpError('Unable to reach the server');
            }

            throw new UnknownError();
        }

        const json = await res.json();

        if (!res.ok) {
            throw new APIError(json['message'], json['code'], json['details']);
        }

        return json;
    }
}
