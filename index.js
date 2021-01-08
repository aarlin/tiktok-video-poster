const Discord = require('discord.js');
const client = new Discord.Client();
const TikTokScraper = require('tiktok-scraper');
require('dotenv').config();
const tiktok = require('./tiktok');
const fs = require('fs');

const TIKTOK_PATTERN = /^(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com)\/@([0-9a-z_-]+)\/video\/(\d+)/i;
const TIKTOK_SHORT_PATTERN = /^(?:https?:\/\/)?(?:vm\.tiktok\.com)\/([0-9a-z_-]+)/i;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (TIKTOK_PATTERN.test(msg.content)) {
    try {
      tiktok.getOriginTikTokUrl(msg.content).then(res => {
        // console.log(res);
        res.pipe(fs.createWriteStream(`./song.mp4`));
      });
      msg.reply('ping');
    } catch (error) {
      console.log(error);
    }
  } else if (TIKTOK_SHORT_PATTERN.test(msg.content)) {
    try {
      tiktok.getOriginTikTokUrl(msg.content).then(res => {
        console.log(res);
        res.data.pipe(fs.createWriteStream(`./song.mp4`));
      });
      msg.reply('pong');
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);