const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('yardım')
		.setDescription('Yardım Sayfası!'),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
	async execute(client, interaction) {
		await interaction.reply(`\`/baslat\` komutuyla radyoyu başlatabilirsin. (KralPoP)`);
	},
};
