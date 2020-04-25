import { createReadStream, createWriteStream, WriteStream, ReadStream } from 'fs';
import { parse } from 'path';
import FileSync from 'lowdb/adapters/FileSync';
import low from 'lowdb';

export type repoName = string;
type path = string;
type Schema = {
  logs: {
    [key: string]: path
  }
  repos: repoName[]
}

const adapter = new FileSync<Schema>('./cache.json');
const db = low(adapter);

export function isRepo(name: repoName): boolean {
  return db
    .get('repos')
    .value()
    .some((n) => n === name);
}
export const isLogExist = (name: repoName): boolean => db.get('logs').value()[name] !== undefined;

export const setLogPath = (path: path): void => {
  const { name } = parse(path);

  db.get('logs').value()[name] = path;
  db.write();
};

export const saveRepo = (name: repoName): void => {
  db.get('repos').push(name).write();
};

export const createLogFile = (path: path): WriteStream => createWriteStream(path, { flags: 'w' });
export const readLogFile = (path: path): ReadStream => createReadStream(path);
