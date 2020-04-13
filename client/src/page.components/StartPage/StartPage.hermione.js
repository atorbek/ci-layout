const { axiosInstance } = require('../../config');

describe('Стартовая страница - /', function () {
  beforeEach(async function () {
    await axiosInstance.delete(`/settings`);
  });

  it('Если настройки репозитория заданы отобразить историю билдов', async function () {
    return axiosInstance
      .post('/settings', {
        repoName: 'git@github.com:atorbek/ci-layout.git',
        buildCommand: 'npm install && npm build',
        mainBranch: 'master',
        period: 10
      })
      .then(() => {
        this.browser.url('/').waitForExistElement('.history');
      });
  });

  it('Если настройки репозитория не заданы открыть стартовую страницу', function () {
    return this.browser.url('/').waitForExistElement('.settings');
  });

  afterEach(async function () {
    await axiosInstance.delete('/settings');
  });
});
