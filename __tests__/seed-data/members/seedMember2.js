// Directory name must be plural because of mongoose
const { ObjectId } = require('mongodb');
const memberFactory = require('../../helpers/factories/member');

module.exports = memberFactory.build(
  {
    _id: ObjectId('5cece9d5d86a7c699dcd7f12'),
    nameSurname: 'Mustafa Erdem Köşk',
    email: 'erdemkosk@gmail.com',
    password: 'Testtest00',
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
