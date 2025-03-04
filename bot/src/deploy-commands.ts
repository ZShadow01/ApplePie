import {
    APIApplicationCommand,
    REST,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Routes,
} from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import BotCommand from './core/BotCommand.js';
import { fileURLToPath, pathToFileURL } from 'url';

config();

const requiredEnvVariables: string[] = ['TOKEN', 'CLIENT_ID', 'SERVER_ID'];

// Check if the necessary configuration is available
requiredEnvVariables.forEach((envVar) => {
    if (process.env[envVar] === undefined) {
        console.error(`Error: ${envVar} environment variable is not set.`);
        process.exit(1);
    }
});

const rest = new REST({ version: '10' }).setToken(process.env['TOKEN']!);

/**
 * Deploy the bot commands
 * @param commands The JSON bodies
 */
async function deployCommands(
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]
) {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        const data: APIApplicationCommand[] = (await rest.put(
            Routes.applicationGuildCommands(
                process.env['CLIENT_ID']!,
                process.env['SERVER_ID']!
            ),
            { body: commands }
        )) as APIApplicationCommand[];

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        // Catch and log any errors
        console.error(error);
    }
}

(async () => {
    // Fetch all commands
    const commands = [];
    const directories: string[] = [
        path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'commands'),
    ];

    while (directories.length > 0) {
        const dir: string = directories.shift()!;

        const files: string[] = fs.readdirSync(dir);

        for (const file of files.filter((f) => f.endsWith('.js'))) {
            const filePath = path.join(dir, file);

            if (fs.lstatSync(filePath).isDirectory()) {
                directories.push(filePath);
            } else {
                const module = await import(pathToFileURL(filePath).href);
                const command = module.default;

                if (BotCommand.isBotCommand(command)) {
                    commands.push(command.build());
                }
            }
        }
    }

    // Deploy the bot commands
    await deployCommands(commands);
})();
