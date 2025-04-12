import { SlashCommandBuilder } from 'discord.js';
import BotCommand from '../core/bot-command.js';
import { registerPlayer } from '../services/player-service.js';
import NameTakenError from '../errors/name-taken-error.js';
import AlreadyRegisteredError from '../errors/already-exists-error.js';

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

        const embed = {
            title: 'Successfully registered',
            description: `You are now registered as '${username}'`,
            color: 0x00ff00,
        };

        try {
            await registerPlayer(interaction.user.id, username);
        } catch (err) {
            if (err instanceof NameTakenError) {
                embed.title = 'Username already taken';
            } else if (err instanceof AlreadyRegisteredError) {
                embed.title = 'User already registered';
            } else {
                embed.title = 'Uh oh, something unexpected happened';
            }

            embed.description = (err as Error).message;
            embed.color = 0xff0000;
        }

        await interaction.reply({ embeds: [embed] });
    },
} as BotCommand;
