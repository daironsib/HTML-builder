const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
    if (file.isFile()) {
      let name = path.parse(file.name).name;
      let type = path.extname(file.name).slice(1);

      fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) {
          throw err;
        }

        let size = `${(stats.size / 1000).toString()} kb`;
        stdout.write(`${name} - ${type} - ${size}\n`);
      });
    }
  });
});