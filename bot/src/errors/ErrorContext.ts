import { ChatInputCommandInteraction } from 'discord.js';

export type ErrorContext = {
    context: string;
    interaction: ChatInputCommandInteraction;
};
