const MockAdapter = require('axios-mock-adapter');
const axios = require('../config');
const { stub } = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

const cache = require('../utils/cache');
const isRepo = stub(cache, 'isRepo').returns(true);

const axiosMock = new MockAdapter(axios);
const getSettingsData = {
  data: {
    id: '7ee33ef9-6b07-4217-8d5c-765bde249d65',
    repoName: 'git@github.com:username/username-repository.git',
    buildCommand: 'npm install && npm build',
    mainBranch: 'master',
    period: 10
  }
};

const mockResponse = () => {
  const res = {};
  res.status = stub().returns(res);
  res.json = stub().returns(res);
  return res;
};

describe('settings', () => {
  it('Ручка GET api/settings должна вернуть настройки', async () => {
    // Подготовка
    axiosMock.onGet('/conf').reply(200, getSettingsData);

    // Действия
    const res = mockResponse();
    const { getSettings } = require('../routes/api/settings');
    await getSettings({}, res);

    // Проверка
    res.status.should.have.been.calledWith(200);
    res.json.should.have.been.calledWith(getSettingsData);
  });

  it('Ручка POST api/settings должна сохранить настройки', async () => {
    // Подготовка
    axiosMock.onPost('/conf', getSettingsData.data).reply(200);

    // Действия
    const res = mockResponse();
    const { postSettings } = require('../routes/api/settings');
    await postSettings({ body: getSettingsData.data }, res);
    // Проверка
    res.status.should.have.been.calledWith(200);
    //TODO не нашел как проверить statusText
  });

  after(function () {
    axiosMock.restore();
    isRepo.restore();
  });
});
