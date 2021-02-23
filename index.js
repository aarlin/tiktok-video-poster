const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

require('dotenv').config();
const { exec } = require('child_process');
const splitFile = require('split-file');
const fileUtils = require('./fileUtils');
const config = require('./config').botConfiguration;
const utils = require('./utils');

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
			const metaData = await utils.getVideoMetaData(videoUrl);

			exec(`${config.NPM_SCRIPT} ${videoUrl}`, async (error, stdout, stderr) => {
				if (error) {
					msg.reply(`${error.message}`);
					return;
				}
				if (stderr) {
					msg.reply(`${stderr}`);
					return;
				}
				const fileName = fileUtils.getFileName(stdout);
				const fileSize = fileUtils.getFileSize(fileName);

				console.log(fileSize);

				if (fileName && fileSize <= config.MAX_FILE_SIZE_UPLOAD) {
					const attachment = new MessageAttachment(fileName);
					await msg.channel.send(utils.createVideoText(metaData), attachment);
					fileUtils.deleteFile(fileName);
				}
				else {
					console.log(fileSize);
					console.log(fileSize / 2.0);
					// Remove file format from video and split into pieces
					const fileWithoutFormat = await fileUtils.changeFileName(fileName, fileUtils.getNameWithoutFileFormat(fileName));
					const splitFileNames = await splitFile.splitFileBySize(fileWithoutFormat, fileSize / 2.0);

					// Add back file format to each split video
					for (const [index, file] of splitFileNames.entries()) {
						const newFileName = await fileUtils.changeFileName(file, fileUtils.appendFileFormat(file, config.DOWNLOADED_FILE_FORMAT));
						console.log(index, file, newFileName);
						const attachment = new MessageAttachment(newFileName);
						await msg.channel.send(utils.createSplitVideoText(metaData, index, splitFileNames.length), attachment);
						fileUtils.deleteFile(newFileName);
					}
				}
			});
		}
		catch (error) {
			msg.channel.send(error);
			console.log(error);
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
