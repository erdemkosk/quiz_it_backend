const path = require('path');
const { Seeder } = require('mongo-seeding');
const { parse } = require('mongodb-uri');

class DBSeeder {
  constructor(dbUri, dbName) {
    const { username, password, hosts } = parse(dbUri);
    const { host, port } = hosts[0];
    const config = {
      database: {
        name: dbName,
        host,
        port,
        username,
        password,
      },
    };

    this.seeder = new Seeder(config);
    this.collections = this.seeder.readCollectionsFromPath(
      path.resolve('./__tests__/seed-data'),
    );
  }

  async seed() {
    return this.seeder
      .import(this.collections)
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = DBSeeder;
