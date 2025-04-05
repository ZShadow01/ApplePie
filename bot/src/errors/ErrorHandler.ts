import { MessageFlags } from 'discord.js';
import BaseError from './BaseError.js';
import { ErrorContext } from './ErrorContext.js';
import HttpError from './http/HttpError.js';

export default class ErrorHandler {
    static async handle(error: BaseError, context: ErrorContext) {
        const reply =
            context.interaction.deferred || context.interaction.replied
                ? context.interaction.followUp
                : context.interaction.reply;

        if (error instanceof HttpError) {
            await reply({
                content: 'There was an error while fetching!',
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        await reply({
            content: 'There was an error while executing this command!',
            flags: MessageFlags.Ephemeral,
        });
    }
}
