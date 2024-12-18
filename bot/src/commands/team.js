const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('Team commands')
        .addSubcommand(subcommand =>
            subcommand.setName('create')
                .setDescription('Create a new team')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('The name of the team')
                        .setRequired(true)
                )
        ),

    async execute(interaction) {

    }
}
