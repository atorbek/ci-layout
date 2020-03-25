const { createWriteStream, createReadStream } = require('fs');
const { parse } = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./cache.json');
const low = require('lowdb');
const db = low(adapter);

const isRepo = (name) =>
  db
    .get('repos')
    .value()
    .some((n) => n === name);
const isLogExist = (name) => db.get('logs').value()[name] !== undefined;

setLogPath = (path) => {
  const { name } = parse(path);

  db.get('logs').value()[name] = path;
  db.write();
};

const saveRepo = (name) => {
  db.get('repos').push(name).write();
};

const createLogFile = (path) => createWriteStream(path, { flags: 'w' });
const readLogFile = (path) => createReadStream(path);

module.exports = {
  isRepo,
  isLogExist,
  setLogPath,
  saveRepo,
  createLogFile,
  readLogFile
};
