module.exports = {
  name: 'pause',
  description: 'The current ambiance has been paused',

  execute(message, bot, dispatchers) {
    // user current channel id
    const { channel } = message.member.voice;
    // console.log('HELLLOOO', message.guild.members.cache.get(bot.user.id).voice.channelID, channel.id)

    // bot current channel id
    const ambiancePlayer = message.guild.members.cache.get(bot.user.id).voice;

    // check if user and bot are in same channel
    if (channel.id !== ambiancePlayer.channelID)
      return message.channel.send(
        'You need to be in the same voice channel as the bot to pause/resume music'
      );
    if (!ambiancePlayer)
      return message.channel.send('Bot is not playing music in this server');

    dispatchers[ambiancePlayer.channelID].pause(true);

    dispatchers[ambiancePlayer.channelID].on('error', (error) =>
      console.log(error)
    );
  },
};
