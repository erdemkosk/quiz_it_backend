/* eslint-disable no-return-await */
const dbHandler = require('../../helpers/dbHandler');
const memberDataAccess = require('../../../api/data/data-access/member');
const { CREATE_MEMBER } = require('../../mock-data');
const DBSeeder = require('../../helpers/dbSeeder');

beforeAll(async () => {
  await dbHandler.connect();
  const dbUrl = await dbHandler.getUri();
  const dbName = await dbHandler.getDbName();
  const seeder = new DBSeeder(dbUrl, dbName);
  await seeder.seed();
});

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('member data-access ', () => {
  test('[memberDataAccess.createMember ]can be created correctly', async () => {
    expect(async () => await memberDataAccess.createMember({
      email: CREATE_MEMBER.email,
      password: CREATE_MEMBER.password,
      nameSurname: CREATE_MEMBER.nameSurname,
    }))
      .not
      .toThrow();
  });

  test('[memberDataAccess.getMember ]can be created correctly', async () => {
    const user = await memberDataAccess.getMember({
      id: '5cece9d5d86a7c699dcd7f12',
    });

    expect(typeof user).toBe('object');
  });
});
