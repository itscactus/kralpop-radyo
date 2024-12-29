require('dotenv').config();
const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { loadCommands } = require('./loaders/commands');
const { loadEvents } = require('./loaders/events');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const playingNow = require('./loaders/playingNow');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers
    ] 
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.player = createAudioPlayer();

client.once(Events.ClientReady,async readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    await loadCommands(client, __dirname)
    await loadEvents(client, __dirname)

    setInterval(async() => {
        let nowPlay = await playingNow();
        console.log(nowPlay)
        if(nowPlay.CurrentSong.SongName.split('').length == 1) {
            client.user.setActivity({
                name: 'Reklam Molası.',
                type: ActivityType.Listening
            })
        } else {
            client.user.setActivity({
                name: `${nowPlay.CurrentSong.SongName} - ${nowPlay.CurrentSong.ArtistName}`,
                type: ActivityType.Listening
            })
        }
    }, 10*1000)

    const resource = createAudioResource('https://dygedge.radyotvonline.net/kralpop/playlist.m3u8',
        {
            inputType: StreamType.Raw
        });
    client.player.play(resource);
});
client.player.on(AudioPlayerStatus.Playing, () => {
	console.log('The audio player has started playing!');
});

client.login(process.env.TOKEN);
