const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const TIKTOK_SHORT_PATTERN = /^(?:https?:\/\/)?(?:vm\.tiktok\.com)\/([0-9a-z_-]+)/i;
  if (TIKTOK_SHORT_PATTERN.test(msg.content)) {
    msg.channel.send('pong');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);