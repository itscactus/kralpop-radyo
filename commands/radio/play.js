const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('baslat')
		.setDescription('Radyoyu başlat!'),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
	async execute(client, interaction) {
		if(interaction.guild.members.me.voice.channel == null && interaction.member.voice.channel == null) return interaction.reply({
            content: 'Lütfen bir ses kanalına bağlanın.',
            ephemeral: true
        });
        if(interaction.guild.members.me.voice.channel != null && interaction.guild.members.me.voice.channelId != interaction.member.voice.channelId) return interaction.reply({
            content: 'Radyo zaten bir kanalda oynatılıyor.',
            ephemeral: true
        });
        let channel = interaction.member.voice.channel
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        connection.subscribe(client.player);

        return interaction.reply({
            content: `<#${channel.id}> kanalında Radyo oynatılıyor.`
        })
	},
};
