const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

require('dotenv').config();
const { exec } = require('child_process');
const fileUtils = require('./fileUtils');
const config = require('./config').botConfiguration;
const utils = require('./utils');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
	if (config.TIKTOK_PATTERN.test(msg.content) || config.TIKTOK_SHORT_PATTERN.test(msg.content)) {
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
				const fileName = fileUtils.getFileName(stdout);
				const fileSize = fileUtils.getFileSize(fileName);
				if (fileName && fileSize <= config.MAX_FILE_SIZE_UPLOAD) {
					const attachment = new MessageAttachment(fileName);
					msg.channel.send(`${msg.author},`, attachment);
					fileUtils.deleteFile(fileName);
					// TODO: put into ec2 w/ docker
					// TODO: look at upload limits for bot
					// TODO: reply to user with username of poster with link, description & tags
				}
				else {
					msg.reply(`Could not locate video or file size exceeded ${utils.convertBytesToMB(config.MAX_FILE_SIZE_UPLOAD)} MB.`);
				}
			});
		}
		catch (error) {
			msg.reply(error);
			console.log(error);
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);