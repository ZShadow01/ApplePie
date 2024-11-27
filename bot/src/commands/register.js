const { SlashCommandBuilder } = require('discord.js');
const PlayerService = require('../../../shared/services/PlayerService');
const { primary_colour, success_colour } = require('../../config/default.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register a new player in the PieHub')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the player')
                .setRequired(true)
                .setMaxLength(20)
        ),

    async execute(interaction) {
        const name = interaction.options.getString('name');

        // Register the player in the database
        await PlayerService.register(interaction.user.id, name);

        const embed = {
            color: success_colour,
            author: {
                name: `Welcome ${name}! 🎉`
            },
            description: "Successfully registered as a player in the PieHub"
        };

        await interaction.reply({ embeds: [embed] });
    }
};
