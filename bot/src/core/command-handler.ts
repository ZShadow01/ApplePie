import { Collection, REST, Routes } from 'discord.js';
import fs from 'fs';
import url from 'url';
import path from 'path';
import BotCommand from './bot-command';

export default class CommandHandler {
    public readonly commands: Collection<string, BotCommand>;

    constructor() {
        this.commands = new Collection();
    }

    public async loadCommands(dir: string) {
        const files = fs
            .readdirSync(dir)
            .filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const { default: command } = await import(
                url.pathToFileURL(path.join(dir, file)).href // with file:// protocol
            );

            if (!command.data || !command.execute) continue;

            this.register(command as BotCommand);
        }
    }

    public register(command: BotCommand) {
        this.commands.set(command.data.name, command);
    }

    public async deploy(token: string, clientId: string, guildId: string) {
        const commands = this.commands.map((cmd) => cmd.data.toJSON());

        const rest = new REST().setToken(token);

        try {
            console.log(`Deploying ${commands.length} commands`);

            const data: unknown[] = (await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands }
            )) as unknown[];

            console.log(`Successfully refreshed ${data.length} commands`);
        } catch (err) {
            console.error(err);
        }
    }
}
