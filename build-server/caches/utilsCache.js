const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./serverCache.json');
const cache = low(adapter);
const { v1: uuid } = require('uuid');

const getAgents = () => {
  return cache.get('agents');
};

const getAgent = (id) => {
  return getAgents().find({ agentId: id });
};

const addAgent = (value) => {
  const agentUuidWrapped = { agentId: uuid(), ...value };
  getAgents().push(agentUuidWrapped).write();
  return agentUuidWrapped.agentId;
};

const removeAgent = (agentId) => {
  getAgents().remove({ agentId }).write();
};

const addBuild = ({ agentId, build }) => {
  updateAgent({ agentId, build });
};

const updateAgent = ({ agentId, ...rest }) => {
  return getAgent(agentId).assign(rest).write();
};

const setCache = (key, value) => {
  const object = {
    agent: addAgent,
    build: addBuild,
    updateAgent,
    removeAgent
  };

  return object[key](value);
};

module.exports = {
  setCache,
  getAgent,
  getAgents
};
