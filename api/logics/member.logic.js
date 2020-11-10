/* eslint-disable no-return-assign */
module.exports = class MemberLogic {
  static calculateLevel(level, experience) {
    // eslint-disable-next-line no-param-reassign
    return experience >= this.calculateLevelExperience(level) ? level += 1 : level;
  }

  static calculateLevelExperience(level) {
    //Disgea
    return Math.round(0.04 * (Math.pow(level, 3)) + 0.8 * (Math.pow(level, 2)) + 2 * level);
  }
};
