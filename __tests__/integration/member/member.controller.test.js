const request = require('supertest');
const app = require('../../../main');

describe('Test member/login request and response', () => {
  it('should try to do login with invalid credentials and fail', async () => {
    const res = await request(app)
      .post('/api/member/login')
      .send({ email: 'fakefail@fake.com', password: '00' });
    expect(res.statusCode).toEqual(422);
  });
});
