module.exports = class QuestionLogic {
  static generateRandomNumber(maxValue) {
    return Math.floor(Math.random() * maxValue);
  }

  static removeCharAtIndex(index, str) {
    return `${str.substring(0, index - 1)}_${str.substring(index, str.length)}`;
  }

  static generateAnswersForBlankInFills(str, isvowel) {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let consonant = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'y', 'z', 'q', 'w'];

    const selectedAnswers = [];

    if (isvowel) {
      vowels = vowels.filter(item => item !== str);
      while (selectedAnswers.length !== 3) {
        const selectedValue = vowels[this.generateRandomNumber(vowels.length)];
        vowels = vowels.filter(item => item !== selectedValue);

        selectedAnswers.push(selectedValue);
      }
    }

    else {
      consonant = consonant.filter(item => item !== str);
      while (selectedAnswers.length !== 3) {
        const selectedValue = consonant[this.generateRandomNumber(consonant.length)];
        consonant = consonant.filter(item => item !== selectedValue);

        selectedAnswers.push(selectedValue);
      }
    }
    console.log(selectedAnswers);
    return selectedAnswers;
  }

  static isVowels(str) {
    return ('aeiouAEIOU'.indexOf(str) !== -1);
  }

  static getShuffledArr(arr) {
    if (arr.length === 1) {
      return arr;
    }
    const rand = Math.floor(Math.random() * arr.length);
    return [arr[rand], ...this.getShuffledArr(arr.filter((_, i) => i !== rand))];
  }
};
