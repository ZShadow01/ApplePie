const BaseError = require('../../../shared/errors/BaseError');

const { error_colour } = require('../../config/default.json');


module.exports = async function handleCommandError(error, interaction) {
    const embed = {
        color: error_colour
    };

    if (error instanceof BaseError) {
        switch (error.code) {
            case 'PLAYER_ALREADY_REGISTERED':
                embed.description = 'You are already registered as a player';
                break;

            case 'PLAYER_NAME_TAKEN':
                embed.description = `The name "${error.metadata.playerName}" is already taken`;
                break;

            default:
                embed.description = `An error occurred: ${error.code}`;
                break;
        }
    } else {
        console.error(error);
        embed.description = 'Uh oh, something went wrong';
    }

    if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [embed] });
        return;
    }

    await interaction.reply({ embeds: [embed] });
};
