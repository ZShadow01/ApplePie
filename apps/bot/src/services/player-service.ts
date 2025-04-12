import ServerConnector from '../core/server-connector.js';
import { config } from 'dotenv';
import NameTakenError from '../errors/name-taken-error.js';
import APIError from '../errors/api-error.js';
import AlreadyExistsError from '../errors/already-exists-error.js';
import UnknownError from '../errors/unknown-error.js';

config();

const API_URL = `${process.env['SERVER_URL']}/api/v1/players`;

export async function registerPlayer(discordId: string, username: string) {
    try {
        await ServerConnector.request(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                discordId,
                username,
            }),
        });
    } catch (err) {
        if (err instanceof APIError) {
            switch (err.code) {
                case 110:
                    throw new NameTakenError(
                        `The player name '**${username}**' is taken`,
                        username
                    );

                case 111:
                    throw new AlreadyExistsError(
                        `You are already registered as a player`,
                        discordId
                    );

                case 101:
                    throw new UnknownError(
                        'An unexpected server error occurred while registering you as a player'
                    );
            }
        }

        throw err;
    }
}
