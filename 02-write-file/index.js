const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Введите текст\n');
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdin.on('data', data => {
  data.toString().trim() === 'exit' ? process.emit('SIGINT') : file.write(data.toString());
});

process.on('SIGINT', () => {
  stdout.write('Удачи и хорошего дня!');
  process.exit();
});