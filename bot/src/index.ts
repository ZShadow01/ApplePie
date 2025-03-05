import { config } from 'dotenv';
import { Bot } from './Bot.js';

config();

// Check if the Discord bot token is provided in the environment variables
if (process.env['TOKEN'] === undefined) {
    console.error('Error: TOKEN environment variable is not set.');
    process.exit(1);
}

if (process.env['SERVER_URL'] === undefined) {
    console.error('Error: SERVER_URL environment variable is not set.');
    process.exit(1);
}

// Create a new Bot instance
const bot: Bot = new Bot(process.env['SERVER_URL']);

// Start the bot (initializes implicitly)
bot.login(process.env['TOKEN']);
