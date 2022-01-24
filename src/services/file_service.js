const fs = require("fs");
const util = require("util");
const copyFile = util.promisify(fs.copyFile);

const moveFile = async (oldPath, newPath) => {
    await copyFile(oldPath, newPath);
};

const getFileExtension = (filename) => {
    return filename.split(".").pop();
};

module.exports = {
    moveFile,
    getFileExtension
};