const TikTokScraper = require('tiktok-scraper');
const { exec } = require('child_process');

function execShellCommand(cmd) {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
			}
			resolve(stdout ? stdout : stderr);
		});
	});
}

function convertBytesToMB(bytes) {
	return bytes / 1e6;
}

function getVideoMetaData(url) {
	return TikTokScraper.getVideoMeta(url, {});
}

function getMetadata(videoMeta) {
	return {
		headers: videoMeta.headers,
		text: videoMeta.collector[0].text,
		name: videoMeta.collector[0].authorMeta.name,
		nickname: videoMeta.collector[0].authorMeta.nickname,
		id: videoMeta.collector[0].id,
		videoUrl: videoMeta.collector[0].videoUrl,
	};
}

function createVideoText(metadata) {
	return '@' + metadata.name + '\n' + metadata.text;
}

function createSplitVideoText(metadata, part, totalParts) {
	const adjustedPart = part + 1;
	if (adjustedPart === 1) {
		return '@' + metadata.name + '\n' + metadata.text + '\n' + `Part ${adjustedPart} of ${totalParts}`;
	}
	else {
		return `Part ${adjustedPart} of ${totalParts}`;
	}
}

module.exports = {
	execShellCommand,
	convertBytesToMB,
	getVideoMetaData,
	getMetadata,
	createVideoText,
	createSplitVideoText,
};
