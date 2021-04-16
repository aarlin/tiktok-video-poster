const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

require('dotenv').config();
const fileUtils = require('./fileUtils');
const config = require('./config').botConfiguration;
const utils = require('./utils');
const fs = require("fs");
const proxyList = fs.readFileSync("./proxy-list.txt", 'utf-8').split('\n');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'LISTENING' })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);
});

client.on('message', async (msg) => {
	if (config.TIKTOK_PATTERN.test(msg.content) || config.TIKTOK_SHORT_PATTERN.test(msg.content)) {
		try {
			const videoUrl = msg.content.match(config.TIKTOK_SHORT_PATTERN)[0];
			const metaData = await utils.getVideoMetaData(videoUrl, proxyList);
			const selectedMetadata = utils.getMetadata(metaData);

			const tiktokVideo = await utils.execShellCommand(`${config.NPM_SCRIPT} ${videoUrl}`);

			const fileName = fileUtils.getFileName(tiktokVideo);
			const fileSize = await fileUtils.getFileSize(fileName);

			if (fileName && fileSize <= config.MAX_FILE_SIZE_UPLOAD) {
				console.log(fileName);
				const attachment = new MessageAttachment(fileName);
				await msg.channel.send(utils.createVideoText(selectedMetadata), attachment);
			}
			else {
				const splitFiles = await fileUtils.splitFile(fileName);
				await msg.channel.send(utils.createVideoText(selectedMetadata));

				for (let i = 0; i < splitFiles.length; i++) {
					console.log(splitFiles[i].name);
					const attachment = new MessageAttachment(splitFiles[i].name);
					await msg.channel.send(`Part ${i + 1} of ${splitFiles.length}`, attachment);
				}

				for (const file of splitFiles) {
					await fileUtils.deleteFile(file.name);
				}
			}

			await fileUtils.deleteFile(fileName);
		}
		catch (error) {
			msg.channel.send(error);
			console.log(error);
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
