const fs = require('fs');

function getFileName(stdout) {
    if (stdout.indexOf('Video location:')) {
        const filePath = stdout.split('Video location: ')[1].trim();
        const file = filePath.match(/[^\\\/]*\.(\w+)$/)
        if (file) {
            return file[0];
        }
    }
    return '';
}

/* Get the file size in bytes
 * parameter (file) name of the file
 *
 */
function getFileSize(file) {
    if (file) {
        let stats = fs.statSync(file);
        return stats.size;
    }
}

module.exports = {
    getFileName, getFileSize 
}