import {
    ChatInputCommandInteraction,
    MessageFlags,
    InteractionReplyOptions,
} from 'discord.js';
import BaseError from '../errors/base-error.js';

export default class ErrorHandler {
    static async handle(
        err: Error,
        context: {
            context: string;
            interaction: ChatInputCommandInteraction;
        }
    ) {
        const reply = async (options: InteractionReplyOptions) => {
            if (context.interaction.replied || context.interaction.deferred) {
                await context.interaction.followUp(options);
            } else {
                await context.interaction.reply(options);
            }
        };

        if (err instanceof BaseError) {
            await reply({
                content: 'Breh',
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        await reply({
            content:
                'An unexpected error occurred while executing this command',
            flags: MessageFlags.Ephemeral,
        });
    }
}
