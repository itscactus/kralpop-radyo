const path = require("path");
const { Client } = require("discord.js");
const { glob } = require("glob");

/**
 * 
 * @param {Client} client 
 */
async function loadCommands(client, mainPath) {
    const commandFiles = await glob('./commands/**/*.js');
    console.log(commandFiles)
    for(const file of commandFiles) {
        const filePath = path.join(mainPath, file)
        console.log(filePath)
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
            client.application.commands.create(command.data.toJSON()).then((cmd) => {
                console.log(`[Command] /${cmd.name} registered`)
            })
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
    }
}

module.exports = { loadCommands }