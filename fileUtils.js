const { promises: fs } = require('fs');

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

module.exports = {
	getFileName, getFileSize, deleteFile, getNameWithoutFileFormat, appendFileFormat, changeFileName,
};