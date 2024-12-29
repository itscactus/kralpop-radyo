const { Events, Client, Collection } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
    /**
     * 
     * @param {Client} client 
     * @param {import('discord.js').Interaction} interaction 
     */
	async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`\`/${interaction.commandName}\` komutu bulunamadı.`);
            return;
        }
        const { cooldowns } = client;

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1_000);
                return interaction.reply({ content: `Lütfen komutu tekrar kullanmak için <t:${expiredTimestamp}:R> kadar bekleyiniz.`, ephemeral: true });
            }
        }
        try {
            
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Komutu kullanırken bir hata oluştu!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Komutu kullanırken bir hata oluştu!', ephemeral: true });
            }
        }
    },
};
