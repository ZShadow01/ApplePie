import Bot from 'core/bot.js';
import BotEvent from '../core/bot-event.js';
import { Client, Events } from 'discord.js';

export default {
    name: Events.ClientReady,
    once: true,
    execute: async (_: Bot, client: Client) => {
        console.log(client.user!.username);
        console.log(client.user!.id);
        console.log('Online');
    },
} as BotEvent;
