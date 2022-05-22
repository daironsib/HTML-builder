// const fs = require('fs');
// const path = require('path');
// const { stdin, stdout } = process;

// process.stdin.defaultEncoding;
// process.stdin.setEncoding('utf8');
// process.stdin.resume();

const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Введите текст\n');
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdin.on('data', data => {
  data.toString() === `exit\n` ? process.emit('SIGINT') : file.write(data.toString());
});
process.on('SIGINT', () => {
  stdout.write('Удачи!');
  process.exit();
});