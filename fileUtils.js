const config = require('./config').botConfiguration;
const { promises: fs } = require('fs');
const { getVideoDurationInSeconds } = require('get-video-duration');
const mediaSplit = require('media-split');
const utils = require('./utils');

function getFileName(stdout) {
	if (stdout.indexOf('Video location:')) {
		const filePath = stdout.split('Video location: ')[1].trim();
		const file = filePath.match(/[^\\\/]*\.(\w+)$/);
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
async function getFileSize(file) {
	try {
		if (file) {
			const stat = await fs.stat(file);
			return stat.size;
		}
	}
	catch (error) {
		console.error(error);
	}
}

async function deleteFile(file) {
	try {
		if (file) {
			await fs.unlink(file);
			console.log(`Deleted file: ${file}`);
		}
	}
	catch (error) {
		console.error(error);
	}
}

function getNameWithoutFileFormat(fileName) {
	return fileName.split('.')[0];
}

function appendFileFormat(fileName, fileFormat) {
	return fileName + fileFormat;
}

async function changeFileName(fileName, newFileName) {
	try {
		fs.rename(fileName, newFileName);
		return newFileName;
	}
	catch (error) {
		console.error(error);
	}
}

async function splitFile(fileName) {
	const fileSize = await getFileSize(fileName);
	const videoDuration = await getVideoDurationInSeconds(fileName);

	if (fileSize >= config.MAX_FILE_SIZE_UPLOAD * 2) {
		console.log(`Splitting into fourths due because video size is greater than ${utils.convertBytesToMB(config.MAX_FILE_SIZE_UPLOAD)} MB`);
		const timeIntoFourths = Math.floor(Math.round(videoDuration / 4));
		const splitDurationFirst = `[00:00 - 00:${timeIntoFourths}]`;
		const splitDurationSecond = `[00:${timeIntoFourths} - 00:${timeIntoFourths * 2}]`;
		const splitDurationThird = `[00:${timeIntoFourths * 2} - 00:${timeIntoFourths * 3}]`;
		const splitDurationFourth = `[00:${timeIntoFourths * 3}]`;

		const fileWithoutFileFormat = this.getNameWithoutFileFormat(fileName);
		const split = new mediaSplit({
			input: fileName,
			sections: [
				`${splitDurationFirst} ${fileWithoutFileFormat}-part1`,
				`${splitDurationSecond} ${fileWithoutFileFormat}-part2`,
				`${splitDurationThird} ${fileWithoutFileFormat}-part3`,
				`${splitDurationFourth} ${fileWithoutFileFormat}-part4`,
			],
			format: 'mp4',
		});
		return split.parse();
	}
	else {
		console.log('Splitting into halves');
		const timeIntoHalves = Math.floor(Math.round(videoDuration / 2));
		const splitDurationFirst = `[00:00 - 00:${timeIntoHalves}]`;
		const splitDurationSecond = `[00:${timeIntoHalves}]`;

		const fileWithoutFileFormat = this.getNameWithoutFileFormat(fileName);
		const split = new mediaSplit({
			input: fileName,
			sections: [
				`${splitDurationFirst} ${fileWithoutFileFormat}-part1`,
				`${splitDurationSecond} ${fileWithoutFileFormat}-part2`
			],
			format: 'mp4',
		});
		return split.parse();
	}
}

module.exports = {
	getFileName, getFileSize, deleteFile, getNameWithoutFileFormat,
	appendFileFormat, changeFileName, splitFile,
};