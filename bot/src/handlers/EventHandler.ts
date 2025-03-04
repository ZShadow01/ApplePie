import { Bot } from '../Bot.js';
import Handler from './Handler.js';
import BotEvent from '../core/BotEvent.js';
import { pathToFileURL } from 'url';

export default class EventHandler extends Handler {
    constructor(bot: Bot) {
        super(bot);
    }

    /**
     * Load the event object from the given file
     * @param filePath The path to the file
     */
    public override async loadFromFile(filePath: string): Promise<void> {
        const module = await import(pathToFileURL(filePath).href);
        const event = module.default;

        if (BotEvent.isBotEvent(event)) {
            if (event.isOnce()) {
                this.bot.once(event.getName(), (...args) =>
                    event.execute(...args)
                );
            } else {
                this.bot.on(event.getName(), (...args) =>
                    event.execute(...args)
                );
            }
        }
    }
}
