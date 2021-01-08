const TikTokScraper = require('tiktok-scraper');
// Get single video metadata
// input - WEB_VIDEO_URL
// For example: https://www.tiktok.com/@tiktok/video/6807491984882765062
// options - not required
(async () => {
    try {
        const videoMeta = await TikTokScraper.getVideoMeta('https://www.tiktok.com/@tiktok/video/6807491984882765062');
        console.log(videoMeta);
    } catch (error) {
        console.log(error);
    }
})();