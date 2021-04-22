const { getVideoIdBySearchQuery} = require('../utils/YT-utils');
const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  description: 'plays ambiance',
  execute(message, args) {
    const streamOptions = { seek: 0, volume: 2.5 };
    const voiceChannel = message.member.voice.channel;
    // const query = args.split(' '); //play forest => [play, forest]
    const query = args.join(' ');
    console.log(query);
    
    voiceChannel
      .join()
      .then(async (connection) => {
        console.log('joined channel');
        const videoId = await getVideoIdBySearchQuery(query)

        message.channel.send(`Playing ${query} ambience`);
        const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
          filter: 'audioonly',
        });

        const dispatcher = connection.play(stream, streamOptions);
        dispatcher.on('end', (end) => {
          console.log('left channel');
          voiceChannel.leave();
        });
      })
      .catch((err) => console.log(err));
  }
}