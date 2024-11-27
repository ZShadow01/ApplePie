require('dotenv').config();


const { Client, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const config = require('../config/default.json');
const getAllFiles = require('./utils/getAllFiles');
const deployCommands = require('./deploy-commands');


const client = new Client({
    intents: [
        'Guilds'
    ]
});


// Setting up event listeners
const eventsDir = path.join(__dirname, config.events_folder);
const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.js'));
for (const eventFile of eventFiles) {
    const event = require(path.join(eventsDir, eventFile));

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


// Setting up the command handler
const commandsDir = path.join(__dirname, config.commands_folder);
const commandFiles = getAllFiles(commandsDir);
client.commands = new Collection();

for (const commandFile of commandFiles) {
    const command = require(commandFile);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Invalid command file: ${commandFile}`);
    }
}


// Refresh the commands
(async () => {
    await deployCommands(client.commands.map((cmd, _) => cmd.data.toJSON()));

    client.login(process.env.BOT_TOKEN);
})();
