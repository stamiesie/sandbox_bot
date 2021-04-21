const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.once('ready', () => {
  console.log('Ready!');
});

client.login('ODM0MjEwNDYzNjc1OTczNjgy.YH9lCQ.C1TYv0hR6J8_lWHp3KQA02DeyuQ');

client.on('message', (message) => {
  if (message.content === '!play') {
    message.channel.send('🎹');

    const streamOptions = { seek: 0, volume: 1 };
    const voiceChannel = message.member.voice.channel;

    voiceChannel
      .join()
      .then((connection) => {
        console.log('joined channel');
        const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
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
});
