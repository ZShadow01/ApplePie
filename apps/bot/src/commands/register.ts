import { SlashCommandBuilder } from 'discord.js';
import BotCommand from '../core/bot-command.js';
import { registerPlayer } from '../services/player-service.js';

export default {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register as a player')
        .addStringOption((option) =>
            option
                .setName('username')
                .setDescription('Set your username')
                .setRequired(true)
                .setMaxLength(24)
        ),
    async execute(interaction) {
        const username = interaction.options.getString('username')!;

        await registerPlayer(interaction.user.id, username);

        await interaction.reply('Register');
    },
} as BotCommand;
