const path = require("path");
const { Client } = require("discord.js");
const { glob } = require("glob");

/**
 * 
 * @param {Client} client 
 */
async function loadEvents(client, mainPath) {
    const eventFiles = await glob('./events/*.js');
    console.log(eventFiles)
    for(const file of eventFiles) {
        const filePath = path.join(mainPath, file)
        console.log(filePath)
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, event.execute.bind(null, client));
        } else {
            client.on(event.name, event.execute.bind(null, client));
        }
    }
}

module.exports = { loadEvents }