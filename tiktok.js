const TikTokScraper = require('tiktok-scraper');
const https = require('https');
const axios = require('axios');
const fs = require('fs');

const webid = Math.floor(Math.random() * 1.00e18);
const headers = {
    "responseType": "blob",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
    "referer": "https://www.tiktok.com/",
    "cookie": `custom_did=${webid}`
};

function getOriginTikTokUrl(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const videoMeta = await TikTokScraper.getVideoMeta(url, { headers });
            if (!videoMeta || !videoMeta.collector || !videoMeta.collector[0].videoUrl) {
                return reject(new Error("Couldn't resolve stream."));
            }

            resolve(videoMeta.collector[0].videoUrl);
        } catch (e) {
            console.log(e);
            reject("Couldn't resolve stream.");
        }
    });
}

exports.getOriginTikTokUrl = getOriginTikTokUrl;