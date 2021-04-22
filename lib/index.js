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

client.login('ODM0MjEwNDYzNjc1OTczNjgy.YH9lCQ._9eNpOILE31rbziZISFopbYAMbk');

client.on('message', (message) => {
  const prefix = '!';
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    client.commands.get('play').execute(message, args);
  
  } else if (command === 'pause') {
    client.commands.get('pause').execute(client, message, args)
  }

  
});
