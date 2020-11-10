const request = require('supertest');
const app = require('../../main');

describe('Test heath request and response', () => {
  it('It should response the GET method', (done) => {
    request(app)
      .get('/api/health/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
