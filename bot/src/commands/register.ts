import BotCommand from '../core/BotCommand.js';
import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import embedconfig from '../../config/embedconfig.json' with { type: 'json' };
import { Bot } from 'Bot.js';

export default new BotCommand(
    new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register yourself as a player')
        .addStringOption((option) =>
            option
                .setName('username')
                .setDescription('Your unique username')
                .setRequired(true)
        ),
    async (interaction) => {
        const bot: Bot = interaction.client as Bot;
        const username: string = interaction.options.getString('username')!;

        await bot.connector.players.create(interaction.user.id, username);

        const embed: APIEmbed = {
            description: `You're now registered as ${username}! 🎉`,
            color: embedconfig['colour-green'],
        };

        await interaction.reply({ embeds: [embed] });
    }
);
