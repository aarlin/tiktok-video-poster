const Discord = require('discord.js');
const client = new Discord.Client();
const TikTokScraper = require('tiktok-scraper');
require('dotenv').config();
const tiktok = require('./tiktok');
const fs = require('fs');
const { exec } = require("child_process");

const TIKTOK_PATTERN = /^(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com)\/@([0-9a-z_-]+)\/video\/(\d+)/i;
const TIKTOK_SHORT_PATTERN = /^(?:https?:\/\/)?(?:vm\.tiktok\.com)\/([0-9a-z_-]+)/i;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (TIKTOK_PATTERN.test(msg.content) || TIKTOK_SHORT_PATTERN.test(msg.content)) {
    try {
      exec(`npm run cli ${msg.content}`, (error, stdout, stderr) => {
        if (error) {
          msg.reply(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          msg.reply(`stderr: ${stderr}`);
          return;
        }
        msg.reply(`stdout: ${stdout}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);