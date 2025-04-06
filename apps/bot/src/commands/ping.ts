import { SlashCommandBuilder } from 'discord.js';
import BotCommand from '../core/bot-command.js';

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    execute: async (interaction) => {
        await interaction.reply('Test');
    },
} as BotCommand;
