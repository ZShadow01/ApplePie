import { Collection } from 'discord.js';
import Handler from './Handler.js';
import { pathToFileURL } from 'url';
import BotCommand from '../core/BotCommand.js';
import { Bot } from '../Bot.js';

export default class CommandHandler extends Handler {
    private commands: Collection<string, BotCommand>;

    constructor(bot: Bot) {
        super(bot);

        this.commands = new Collection();
    }

    /**
     * Load the command object from the given file
     * @param filePath The path to the file
     */
    public override async loadFromFile(filePath: string): Promise<void> {
        const module = await import(pathToFileURL(filePath).href);
        const command = module.default;

        if (BotCommand.isBotCommand(command)) {
            this.commands.set(command.getName(), command);
        }
    }

    public getCommands(): Collection<string, BotCommand> {
        return this.commands;
    }
}
