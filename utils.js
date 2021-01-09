const TikTokScraper = require('tiktok-scraper');

function convertBytesToMB(bytes) {
	return bytes / 1e6;
}

function getVideoMetaData(url) {
	const headers = {
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36',
		'referer': 'https://www.tiktok.com/',
	};

	return new Promise((resolve, reject) => {
		try {
			TikTokScraper.getVideoMeta(url, { headers }).then((metaData) => {
				resolve({
					text: metaData.collector[0].text,
					name: metaData.collector[0].authorMeta.name,
					nickname: metaData.collector[0].authorMeta.nickname,
				});
			});

		} catch (e) {
			console.log(e);
			reject('Couldn\'t resolve stream.');
		}
	});
}

module.exports = {
	convertBytesToMB,
	getVideoMetaData,
};
