const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const cssFolder = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist');
const bundleFile = path.join(dist, 'bundle.css');

(async function compileCss(sources, bundle) {
  await fsPromises.rm(dist, { force: true, recursive: true });
  await fsPromises.mkdir(dist, { recursive: true });

  fsPromises.readdir(sources, { withFileTypes: true })
    .then((data) => {
      data.forEach((file) => {
        const fileExt = path.extname(file.name).replace('.', ' ').trim();
        const filePath = path.resolve(cssFolder, file.name);
        
        if (file.isFile() && fileExt === 'css') {
          fs.readFile((filePath),(err, data) => {
            fs.appendFile(bundle, data, err => { if (err) throw err; });
          })
        }
      })
    })
})(cssFolder, bundleFile);
