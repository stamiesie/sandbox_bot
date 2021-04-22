const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const fs = require('fs');

client.once('ready', () => {
  console.log('Ready!');
});

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync(`${__dirname}/./commands`)
  .filter((file) => file.endsWith('.js'));
console.log(commandFiles);

commandFiles.forEach((file) => {
  console.log(file);
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
});

client.login('ODM0MjEwNDYzNjc1OTczNjgy.YH9lCQ.z6vtJh0MmCCxae31gPbpSM0M7BU');

client.on('message', (message) => {
  const prefix = '!';
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    client.commands.get('play').execute(message, args);
  }

  //   voiceChannel
  //     .join()
  //     .then(async (connection) => {
  //       const req = await fetch(
  //         `https://www.googleapis.com/youtube/v3/search?
  //         order=viewCount&q=banana+ambience&type=video&key=AIzaSyD2EFMYVr4ulyHKfZZXQaPJ34bpmYxeEHc&part=snippet`,
  //         {
  //           headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       )
  //       const reqJson = await req.json();
  //       const videoId = reqJson.items[0].id.videoId;
  //       console.log('joined channel');
  //       console.log(videoId);
  //       console.log(reqJson);

  //       message.channel.send(`Playing banana ambience`);
  //       const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
  //         filter: 'audioonly',
  //       });

  //       const dispatcher = connection.play(stream, streamOptions);
  //       dispatcher.on('end', (end) => {
  //         console.log('left channel');
  //         voiceChannel.leave();
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }
});
