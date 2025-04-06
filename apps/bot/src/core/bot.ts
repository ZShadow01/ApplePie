import CommandHandler from './command-handler.js';
import EventHandler from './event-handler.js';
import { Client, GatewayIntentBits } from 'discord.js';

export default class Bot {
    #token: string;

    public readonly client: Client;

    private eventHandler: EventHandler;
    public readonly commandHandler: CommandHandler;

    private eventsDir: string;
    private commandsDir: string;

    constructor(token: string, options: { commands: string; events: string }) {
        this.#token = token;

        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });

        this.eventHandler = new EventHandler(this);
        this.commandHandler = new CommandHandler();

        this.commandsDir = options.commands;
        this.eventsDir = options.events;
    }

    public async run() {
        await this.eventHandler.loadEvents(this.eventsDir);
        await this.commandHandler.loadCommands(this.commandsDir);

        this.client.login(this.#token);
    }
}
