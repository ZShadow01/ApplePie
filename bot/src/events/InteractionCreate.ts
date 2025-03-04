import { Events, Interaction, MessageFlags } from 'discord.js';
import { Bot } from '../Bot.js';
import BotEvent from '../core/BotEvent.js';
import BotCommand from '../core/BotCommand.js';

export default new BotEvent(
    Events.InteractionCreate,
    async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const bot = interaction.client as Bot;

        const command: BotCommand | undefined = bot.getCommand(
            interaction.commandName
        );

        if (command === undefined) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(err);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    }
);
