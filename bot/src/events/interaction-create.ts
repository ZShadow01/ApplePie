import ErrorHandler from '../core/error-handler.js';
import Bot from '../core/bot.js';
import BotEvent from '../core/bot-event.js';
import { ChatInputCommandInteraction, Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    execute: async (bot: Bot, interaction: ChatInputCommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = bot.commandHandler.commands.get(
            interaction.commandName
        );

        // Should never be reached unless not refreshed
        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error(
                          typeof err === 'string' ? err : JSON.stringify(err)
                      );
            ErrorHandler.handle(error, {
                context: interaction.commandName,
                interaction,
            });
        }
    },
} as BotEvent;
