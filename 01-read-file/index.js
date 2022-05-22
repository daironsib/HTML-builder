const fs = require('fs');
const path = require('path');
const { stdout } = process;

let stream = fs.createReadStream(path.join(__dirname, 'text.txt'));

stream.on('data', function (chunk) {
  stdout.write(chunk.toString());
});