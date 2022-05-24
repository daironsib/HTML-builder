const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const dist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const cssFolder = path.join(__dirname, 'styles');
const bundleCss = path.join(dist, 'style.css');
const htmlPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');

const addFolder = path => fsPromises.mkdir(path, { recursive: true });

const removeFolder = path => fsPromises.rm(path, { recursive: true, force: true });

const readFolder = path => fsPromises.readdir(path, { withFileTypes: true });

const getFileExt = file => path.extname(file.name).replace('.', ' ').trim();

const copyFolder = async (source, destination) => {
  await removeFolder(destination);
  await addFolder(destination);

  readFolder(source)
    .then((data) => {
      data.forEach((file) => {
        if (file.isFile()) {
          fsPromises.copyFile(path.resolve(source, file.name), path.resolve(destination, file.name));
        } else {
          copyFolder(path.resolve(source, file.name), path.resolve(destination, file.name));
        }
      })
    })
}

const compileCss = async (sources, bundle) => {
  await removeFolder(dist);
  await addFolder(dist);

  readFolder(sources)
    .then((data) => {
      data.forEach((file) => {
        const fileExt = getFileExt(file);
        const filePath = path.resolve(cssFolder, file.name);
        
        if (file.isFile() && fileExt === 'css') {
          fs.readFile((filePath),(err, data) => {
            fs.appendFile(bundle, data, err => { if (err) throw err; });
          })
        }
      })
    })
};

const createHtml = async (templ, components, output) => {
  let html = await fsPromises.readFile(templ);
  html = html.toString();
  let files = await readFolder(components);
  for (const file of files) {
    const fileExt = getFileExt(file);
    if (file.isFile() && fileExt === 'html') {
      let component = await fsPromises.readFile(path.join(components, file.name));
      html = html.replace(`{{${file.name.replace(/\.html/, '')}}}`, component.toString());
    }
  }
  fsPromises.writeFile(output, html);
};

(async function buildPage() {
  await removeFolder(dist);
  await addFolder(dist);
  createHtml(template, htmlPath, path.join(dist, 'index.html'));
  await compileCss(cssFolder, bundleCss);
  await copyFolder(assetsPath, path.join(dist, 'assets'));
})();
