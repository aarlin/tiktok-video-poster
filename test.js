const ffmetadata = require('ffmetadata');

ffmetadata.read('6931496556042489093.sf-part1.mp4', function (err, data) {
    if (err) console.error("Error reading metadata", err);
    else console.log(data);
});