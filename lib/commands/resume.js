module.exports = {
  name: 'resume',
  description: 'The current ambiance has been paused and then resumed',

  execute(message, bot, dispatchers) {
    const ambiancePlayer = message.guild.members.cache.get(bot.user.id).voice;
    dispatchers[ambiancePlayer.channelID].resume(message);

    dispatchers[ambiancePlayer.channelID].on('error', (error) =>
      console.log(error)
    );
  },
};
