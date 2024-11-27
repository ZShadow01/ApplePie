const { SlashCommandBuilder } = require('discord.js');
const PlayerService = require('../../../shared/services/PlayerService');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register a new player in the PieHub')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the player')
                .setRequired(true)
                .max_length(20)
        ),

    async execute(interaction) {
        const name = interaction.options.getString('name');

        await interaction.reply('Registering... not really: ' + name);
    }
};
