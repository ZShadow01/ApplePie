const fs = require('fs');
const path = require('path');

/**
 * Searches for all files in a directory and its subdirectories
 * @param {String} dir Directory path to search for files
 * @returns {Array} Array of all files
 */
module.exports = function getAllFiles(dir) {
    const files = [];
    
    const directories = [dir];

    while (directories.length > 0) {
        const currentDir = directories.shift();

        const entries = fs.readdirSync(currentDir);

        for (const entry of entries) {
            const entryPath = path.join(currentDir, entry);

            const stat = fs.statSync(entryPath);

            // If entry is a directory, add it to the directories array for further processing. Otherwise, add it to the files array
            if (stat.isDirectory()) {
                directories.push(entryPath);
            }
            else {
                files.push(entryPath);
            }
        }
    }

    return files;
};
