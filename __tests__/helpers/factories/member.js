const { Factory } = require('rosie');
const { ObjectId } = require('mongodb');
const faker = require('faker/locale/tr');

module.exports = new Factory().attrs(
  {
    _id: new ObjectId(),
    nameSurname: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.words(10),
    admin: false,
    level: 5,
    levelExperience: 35,
    currentExperience: 20,
    createdAt: Date.now(),
    statistic: {
      totalQuestion: 15,
      totalRightAnswers: 13,
      totalWrongAnswers: 2,
    },
  },
);
