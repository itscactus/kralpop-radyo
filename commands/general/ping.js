const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Botun gecikme süresi!'),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
	async execute(client, interaction) {
		await interaction.reply(`\`${client.ws.ping}\`ms`);
	},
};
