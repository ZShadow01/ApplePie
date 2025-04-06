import url from 'url';
import Bot from './core/bot.js';
import { config } from 'dotenv';

config();

if (process.env['TOKEN'] === undefined) {
    console.error('No token');
    process.exit(1);
}

const bot: Bot = new Bot(process.env['TOKEN']!, {
    commands: url.fileURLToPath(new URL('commands', import.meta.url)),
    events: url.fileURLToPath(new URL('events', import.meta.url)),
});

bot.run();
