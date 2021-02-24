const { promises: fs } = require('fs');
const { getVideoDurationInSeconds } = require('get-video-duration');
const mediaSplit = require('media-split');

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
	const videoDuration = await getVideoDurationInSeconds(fileName);
	const splitDuration = `[00:00 - 00:${Math.floor(Math.round(videoDuration / 2))}]`;
	const splitDurationEnd = `[00:${Math.floor(Math.round(videoDuration / 2))}]`;

	return new Promise((resolve, reject) => {
		const fileWithoutFileFormat = this.getNameWithoutFileFormat(fileName);
		const split = new mediaSplit({
			input: fileName,
			sections: [`${splitDuration} ${fileWithoutFileFormat}-part1`, `${splitDurationEnd} ${fileWithoutFileFormat}-part2`],
			format: 'mp4',
		});
		resolve(split.parse());
	});
}

module.exports = {
	getFileName, getFileSize, deleteFile, getNameWithoutFileFormat,
	appendFileFormat, changeFileName, splitFile,
};