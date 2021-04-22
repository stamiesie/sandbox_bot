module.exports = {
    name: 'pause',
    aliases: ['resume'],
    description: 'The current ambiance has been paused/resumed',

    execute(bot, message, args) {
        const { channel } = message.member.voice;
       // console.log('HELLLOOO', message.guild.members.cache.get(bot.user.id).voice.channelID, channel.id)

        const ambiancePlayer = message.guild.members.cache.get(bot.user.id).voice;
        console.log('YAAAAAAAAAAAA', ambiancePlayer.guild.voiceStates)
        if(channel.id !== ambiancePlayer.channelID) return message.channel.send('You need to be in the same voice channel as the bot to pause/resume music');
        if(!ambiancePlayer) return message.channel.send('Bot is not playing music in this server');
        
        ambiancePlayer.pause(ambiancePlayer.playing);
        return message.channel.send(`Ambiance bot is now ${ambiancePlayer.playing ? 'resumed' : 'paused'}`)
    }



}