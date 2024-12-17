const { SlashCommandBuilder } = require('discord.js');
const PlayerService = require('../../../shared/services/PlayerService');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('forceregister')
        .setDescription('Forcefully register a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to register')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the user')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const name = interaction.options.getString('name');

        // Forcefully register the user in the database
        await PlayerService.register(user.id, name);

        await interaction.reply("Forcefully register " + user.name);
    }
};
