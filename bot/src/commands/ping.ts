import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import BotCommand from '../core/BotCommand.js';

export default new BotCommand(
    new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
    async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply('Pong!');
    }
);
