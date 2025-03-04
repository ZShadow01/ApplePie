import { Events } from 'discord.js';
import BotEvent from '../core/BotEvent.js';

export default new BotEvent(Events.ClientReady, async (client) => {
    console.log(`${client.user.username} is online`);
});
