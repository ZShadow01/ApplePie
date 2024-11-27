const { REST, Routes } = require('discord.js');
const path = require('path');

require('dotenv').config();

const getAllFiles = require('./utils/getAllFiles');
const { commands_folder } = require('../config/default.json');

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN);

/**
 * Deploys all the commands to the Discord API
 * @param {Array} commands Array of commands
 */
async function deployCommands(commands) {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Refresh the commands in the Discord API using the provided commands array
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_SERVER_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// Log the errors
		console.error(error);
	}
}


if (require.main === module) {
    (async () => {
        const commandFiles = getAllFiles(path.join(__dirname, commands_folder));
        const commands = [];

        for (const commandFile of commandFiles) {
            const command = require(commandFile);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${commandFile} is missing a required "data" or "execute" property.`);
            }
        }

        await deployCommands(commands);
    })();
} else {
    module.exports = deployCommands;
}
