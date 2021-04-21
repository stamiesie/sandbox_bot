const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

client.once('ready', () => {
  console.log('Ready!');
});

client.login('ODM0MjEwNDYzNjc1OTczNjgy.YH9lCQ.n9AgMT3PTTC2XRpffy9I04T1mao');

client.on('message', (message) => {
  if (message.content === '!play') {
    message.channel.send('🎹');

    const streamOptions = { seek: 0, volume: 2.5 };
    const voiceChannel = message.member.voice.channel;

    voiceChannel
      .join()
      .then(async (connection) => {
        const req = await fetch(
          `https://www.googleapis.com/youtube/v3/search?
          order=viewCount&q=banana+ambience&type=video&key=AIzaSyD2EFMYVr4ulyHKfZZXQaPJ34bpmYxeEHc&part=snippet`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
        console.log('joined channel');
        const reqJson = await req.json();
        const videoId = reqJson.items[0].id.videoId;
        console.log(videoId);
        console.log(reqJson);

        message.channel.send(`Playing banana ambience`);
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
});
