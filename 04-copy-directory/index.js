const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

(async function copyDir() {
  await fsPromises.rm(path.resolve(__dirname, 'files-copy'), { force: true, recursive: true });
  await fsPromises.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true });

  fsPromises.readdir(path.resolve(__dirname, 'files'), { withFileTypes: true })
    .then((data) => {
      data.forEach((file) => {
        fsPromises.copyFile(path.resolve(__dirname, 'files', file.name), path.resolve(__dirname, 'files-copy', file.name));
      })
    })
})();
