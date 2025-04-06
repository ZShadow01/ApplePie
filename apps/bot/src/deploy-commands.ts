import { config } from 'dotenv';
import CommandHandler from './core/command-handler.js';
import { fileURLToPath } from 'url';

config();

const commandHandler = new CommandHandler();

(async () => {
    await commandHandler.loadCommands(
        fileURLToPath(new URL('commands', import.meta.url))
    );

    await commandHandler.deploy(
        process.env['TOKEN']!,
        process.env['CLIENT_ID']!,
        process.env['SERVER_ID']!
    );
})();
