import ServerConnector from '../core/server-connector.js';
import { config } from 'dotenv';

config();

const API_URL = `${process.env['SERVER_URL']}/api/v1/players`;

export async function registerPlayer(discordID: string, username: string) {
    const res = await ServerConnector.request(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            discordID,
            username,
        }),
    });

    console.log(res);
}
