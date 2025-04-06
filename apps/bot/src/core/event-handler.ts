import url from 'url';
import fs from 'fs';
import path from 'path';
import BotEvent from './bot-event.js';
import Bot from './bot.js';

export default class EventHandler {
    constructor(private bot: Bot) {}

    public async loadEvents(dir: string) {
        const files = fs
            .readdirSync(dir)
            .filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const { default: event } = await import(
                url.pathToFileURL(path.join(dir, file)).href // with file:// protocol
            );

            if (!event.name || !event.execute) continue;

            this.register(event as BotEvent);
        }
    }

    public register(event: BotEvent) {
        if (event.once) {
            this.bot.client.once(event.name, (...args) =>
                event.execute(this.bot, ...args)
            );
        } else {
            this.bot.client.on(event.name, (...args) =>
                event.execute(this.bot, ...args)
            );
        }
    }
}
