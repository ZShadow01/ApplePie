import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    SlashCommandOptionsOnlyBuilder,
    ChatInputCommandInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

export default class BotCommand {
    private builder:
        | SlashCommandBuilder
        | SlashCommandSubcommandsOnlyBuilder
        | SlashCommandOptionsOnlyBuilder;

    private exec: (interaction: ChatInputCommandInteraction) => Promise<void>;

    constructor(
        builder:
            | SlashCommandBuilder
            | SlashCommandSubcommandsOnlyBuilder
            | SlashCommandOptionsOnlyBuilder,
        exec: (interaction: ChatInputCommandInteraction) => Promise<void>
    ) {
        this.builder = builder;
        this.exec = exec;
    }

    /**
     * Get the name of the command
     * @returns The name of the command
     */
    public getName(): string {
        return this.builder.name;
    }

    /**
     * Execute the command
     * @param interaction The chat input command interaction object
     */
    public async execute(interaction: ChatInputCommandInteraction) {
        await this.exec(interaction);
    }

    /**
     * Return the object that represents the Slash Command
     * @returns The JSON representation of the SlashCommand object
     */
    public build(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return this.builder.toJSON();
    }

    /**
     * Check if the given object is a BotCommand
     * @param command The object to check
     * @returns True if the object is a BotCommand, false otherwise
     */
    public static isBotCommand(command: any): boolean {
        return command instanceof BotCommand;
    }
}
