const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const settings = require('../routes/api/settings');
chai.use(chaiHttp);

describe('Settings /GET', () => {
  it('должен вернуть настройки', (done) => {
    chai
      .request(settings)
      .get('/settings')
      .then((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('json');
        expect(res.body)
          .should.have.property('data')
          .that.include.all.keys([
            'id',
            'repoName',
            'buildCommand',
            'mainBranch',
            'period'
          ]);
      })
      .catch(done());
  });
});
