const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const cssFolder = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist');
let bundleFile = path.join(dist, 'bundle.css');

(async function compileCss(sources, bundle) {
  await fsPromises.rm(bundle, { force: true, recursive: true });

  fsPromises.readdir(sources, { withFileTypes: true })
    .then((data) => {
      data.forEach((file) => {
        const fileExt = path.extname(file.name).replace('.', ' ').trim();
        const filePath = path.resolve(cssFolder, file.name);
        
        if (file.isFile() && fileExt === 'css') {
          fs.readFile((filePath),(err, data) => {
            fs.appendFile(bundleFile, data, err => { if (err) throw err; });
          })
        }
      })
    })
})(cssFolder, bundleFile);
