const MemberLogic = require('../../../api/logic/member');

describe('Member Logic', () => {
  describe('calculateLevelExperience', () => {
    const testCases = [{
      level: 2, experience: 8,
    },
    {
      level: 2, experience: 8,
    }];
    test.each(testCases)('should return Disgea algorithm number', (testCase) => {
      const result = MemberLogic.calculateLevelExperience(testCase.level);
      expect(result).toBe(testCase.experience);
      expect(typeof result).toBe('number');
    });
  });
});
