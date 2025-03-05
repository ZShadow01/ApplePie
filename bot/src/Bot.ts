import { Client, GatewayIntentBits } from 'discord.js';
import EventHandler from './handlers/EventHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import CommandHandler from './handlers/CommandHandler.js';
import BotCommand from './core/BotCommand.js';
import ServerConnector from './services/ServerConnector.js';

export class Bot extends Client {
    private eventHandler: EventHandler;
    private commandHandler: CommandHandler;
    public readonly connector: ServerConnector;

    constructor(serverUrl: string) {
        super({
            intents: [GatewayIntentBits.Guilds],
        });
        this.eventHandler = new EventHandler(this);
        this.commandHandler = new CommandHandler(this);
        this.connector = new ServerConnector(serverUrl);
    }

    /**
     * Initialize the bot by loading the events and commands
     */
    private async init(): Promise<void> {
        const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

        // Load all events
        const eventsPath: string = path.resolve(__dirname, 'events');
        await this.eventHandler.loadFromDirectory(eventsPath);

        // Load all commands
        const commandsPath = path.resolve(__dirname, 'commands');
        await this.commandHandler.loadFromDirectory(commandsPath);
    }

    /**
     * Get the command object from the command handler
     * @param commandName Command name
     * @returns The bot command object
     */
    public getCommand(commandName: string): BotCommand | undefined {
        return this.commandHandler.getCommands().get(commandName);
    }

    public override async login(token?: string): Promise<string> {
        await this.init();

        return super.login(token);
    }
}
