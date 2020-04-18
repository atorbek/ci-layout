const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./agentCache.json');
const cache = low(adapter);
const { v1: uuid } = require('uuid');
const { isEmptyObject } = require('../helpers/utils');

const getAgents = () => {
  return cache.get('agents');
};

const getAgent = (id) => {
  return getAgents().find({ agentId: id });
};

const getFreeAgent = () => {
  let freeAgent = getAgents().find({ status: 'free' }).value();
  return (!isEmptyObject(freeAgent) && freeAgent) || {};
};

const addAgent = (value) => {
  const agentUuidWrapped = { agentId: uuid(), ...value };
  getAgents().push(agentUuidWrapped).write();
};

const addBuild = ({ agentId, build }) => {
  getAgent(agentId).set('build', build).write();
};

const setCache = (key, value) => {
  const object = {
    agent: addAgent,
    build: addBuild
  };

  object[key](value);
};

module.exports = {
  setCache,
  getFreeAgent,
  getAgent
};
