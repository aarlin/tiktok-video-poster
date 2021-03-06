const botConfiguration = {
	MAX_FILE_SIZE_UPLOAD: 8000000,
	DOWNLOADED_FILE_FORMAT: '.mp4',
	TIKTOK_PATTERN: /^(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com)\/@([0-9a-z_-]+)\/video\/(\d+)/i,
	TIKTOK_SHORT_PATTERN: /^(?:https?:\/\/)?(?:vm\.tiktok\.com)\/([0-9a-z_-]+)/i,
	NPM_SCRIPT: process.platform === 'win32' || process.platform === 'win64' ?
		'npm run cli-windows' : 'npm run cli-unix',
};

module.exports = {
	botConfiguration,
};
