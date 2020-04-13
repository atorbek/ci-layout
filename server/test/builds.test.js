const MockAdapter = require('axios-mock-adapter');
const axios = require('../config');
const { stub } = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

const repos = require('../utils/repos');
const commitInfo = stub(repos, 'commitInfo').returns(
  '{"authorName": "user", "commitMessage": "commit message", "branchName": "master"}'
);
const {
  getBuilds,
  postBuild,
  getBuild,
  getBuildLog
} = require('../routes/api/builds');

const axiosMock = new MockAdapter(axios);
const settingsData = {
  data: {
    id: '7ee33ef9-6b07-4217-8d5c-765bde249d65',
    repoName: 'git@github.com:username/username-repository.git',
    buildCommand: 'npm install && npm build',
    mainBranch: 'master',
    period: 10
  }
};
const buildsData = {
  data: [
    {
      id: '88d4527a-cab9-471c-b761-02c2730ef5a1',
      configurationId: '7ee33ef9-6b07-4217-8d5c-765bde249d65',
      buildNumber: 1,
      commitMessage: 'commit message',
      commitHash: '595a8cc482d71a8348332cd5d110d8764d2f6104',
      branchName: 'branch1',
      authorName: 'user1',
      status: 'Waiting'
    },
    {
      id: '20b51baf-4129-420b-872a-ad4b98ca9f08',
      configurationId: '7ee33ef9-6b07-4217-8d5c-765bde249d65',
      buildNumber: 2,
      commitMessage: 'commit message 2',
      commitHash: 'd97b16a6ee782f1ff80ce0ffb6ea8345041375d2',
      branchName: 'branch2',
      authorName: 'user2',
      status: 'Success',
      start: '2020-04-02T21:55:01.077',
      duration: 2
    }
  ]
};

const buildData = {
  data: {
    id: '20b51baf-4129-420b-872a-ad4b98ca9f08',
    configurationId: '7ee33ef9-6b07-4217-8d5c-765bde249d65',
    buildNumber: 2,
    commitMessage: 'commit message 2',
    commitHash: 'd97b16a6ee782f1ff80ce0ffb6ea8345041375d2',
    branchName: 'branch2',
    authorName: 'user2',
    status: 'Success',
    start: '2020-04-02T21:55:01.077',
    duration: 2
  }
};

const mockResponse = () => {
  const res = {};
  res.status = stub().returns(res);
  res.json = stub().returns(res);
  return res;
};

describe('builds', () => {
  it('Ручка GET api/builds должна вернуть список билдов', async () => {
    // Подготовка
    const params = {
      params: {
        offset: 0,
        limit: 2
      }
    };
    axiosMock.onGet('/build/list', params).reply(200, buildsData);

    // Действия
    const res = mockResponse();
    const queryParam = {
      query: {
        offset: 0,
        limit: 2
      }
    };
    await getBuilds(queryParam, res);

    // Проверка
    res.status.should.have.been.calledWith(200);
    res.json.should.have.been.calledWith(buildsData);
  });

  it('Ручка POST /api/builds/:commitHash должна добавить сборку в очередь', async () => {
    // Подготовка
    axiosMock.onGet('/conf').reply(200, settingsData);

    const buildData = {
      data: {
        id: 'eb5140e7-7e61-4710-99e3-2d0daafc85c6',
        buildNumber: 3,
        status: 'Waiting'
      }
    };
    axiosMock.onPost('/build/request').reply(200, buildData);

    // Действия
    const res = mockResponse();
    const { postBuild } = require('../routes/api/builds');
    await postBuild(
      { params: { commitHash: '595a8cc482d71a8348332cd5d110d8764d2f6104' } },
      res
    );

    // Проверка
    res.status.should.have.been.calledWith(200);
    res.json.should.have.been.calledWith(buildData);
  });

  it('Ручка GET /api/builds/:buildId должна получить информацию о билде', async () => {
    // Подготовка
    const params = {
      params: {
        buildId: '88d4527a-cab9-471c-b761-02c2730ef5a1'
      }
    };
    axiosMock.onGet('/build/details', params).reply(200, buildData);

    // Действия
    const res = mockResponse();
    const queryParam = {
      query: {
        buildId: '88d4527a-cab9-471c-b761-02c2730ef5a1'
      }
    };
    await getBuild(queryParam, res);

    // Проверка
    res.status.should.have.been.calledWith(200);
    res.json.should.have.been.calledWith(buildData);
  });

  after(function () {
    axiosMock.restore();
    commitInfo.restore();
  });
});
