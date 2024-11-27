const { Events } = require('discord.js');
const handleCommandError = require('../utils/handleCommandError');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error('No command matching ' + interaction.commandName + ' was found');
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            await handleCommandError(error, interaction)
        }
    }
};
