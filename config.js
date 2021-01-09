const botConfiguration = {
    MAX_FILE_SIZE_UPLOAD: 8000000,
    TIKTOK_PATTERN: /^(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com)\/@([0-9a-z_-]+)\/video\/(\d+)/i,
    TIKTOK_SHORT_PATTERN: /^(?:https?:\/\/)?(?:vm\.tiktok\.com)\/([0-9a-z_-]+)/i
}

module.exports = {
    botConfiguration
}