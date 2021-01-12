/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-tabs */
/* eslint-disable no-param-reassign */
const moment = require('moment-timezone');
/**
 * A Set implementation. Adds item to set
 * @param arr
 * @param item
 */
exports.addToSet = function (arr, item) {
  if (arr.indexOf(item.toString()) == -1) {
    arr.push(item.toString());
  }
};
/**
 * Checks the variable is null or undefined
 * @param variable
 * @returns {boolean}
 */
exports.isNull = function (variable) {
  return !(typeof variable !== 'undefined' && variable !== null);
};
/**
 * Creates and returns a random integer number between given range
 * @param min
 * @param max
 * @returns {Number}
 */
exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Checks the variable is null, empty string or undefined
 * @param variable
 * @returns {boolean}
 */
exports.isNullOrEmpty = function (variable) {
  if (typeof variable === 'string') {
    variable = variable.trim();
  }
  return !(typeof variable !== 'undefined' && variable !== null && variable !== '');
};
/**
 * Checks the giving string is valid email format
 * @param email
 * @returns {boolean}
 */
exports.isEmail = function (email) {
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};
/**
 * Converts date with given time zone city
 * @param milliseconds
 * @param tzCity
 * @returns {*}
 */
// eslint-disable-next-line func-names
exports.getLocalTimeMS = function (milliseconds, tzCity) {
  if (!tzCity) {
    tzCity = 'Europe/Istanbul';
  }
  const cityMoment = moment(milliseconds).tz(tzCity);
  return milliseconds + (cityMoment.utcOffset() * 60 * 1000);
};
/**
 *
 * @param tzCity
 * @returns {number}
 */
exports.getCurrentMinuteOfWeekWithRegion = function (tzCity) {
  const date = new Date(exports.getLocalTimeMS(Date.now(), tzCity));
  return date.getDay() * 24 * 60 + date.getHours() * 60 + date.getMinutes();
};
/**
 * Pad zero
 * @param str
 * @param max
 * @returns {String}
 */
exports.padZero = function (str, max) {
  str = str.toString();
  return str.length < max ? exports.padZero(`0${str}`, max) : str;
};
/**
 * String Format
 * @example stringFormat("{0}, {1}, {2}","zero", "one", "two")
 * @returns {any}
 */
exports.stringFormat = function () {
  let s = arguments[0];
  if (Array.isArray(arguments[1])) {
    const argArray = arguments[1];
    for (let i = 0; i < argArray.length; i++) {
      arguments[i + 1] = argArray[i];
    }
  }
  for (let i = 0; i < arguments.length - 1; i++) {
    const reg = new RegExp(`\\{${i}\\}`, 'gm');
    s = s.replace(reg, arguments[i + 1]);
  }
  return s;
};
/**
 * Replace Turkish Characters
 * @param string
 * @returns {string | * | void}
 */
exports.replaceTurkish = function (string) {
  const letters = {
    ı: 'i',
    ş: 's',
    ğ: 'g',
    ü: 'u',
    ö: 'o',
    ç: 'c',
    İ: 'I',
    Ş: 'S',
    Ğ: 'G',
    Ü: 'U',
    Ö: 'O',
    Ç: 'C',
  };
  string = string.replace(/(([ışğüçöİŞĞÜÇÖ]))/g, letter => letters[letter]);
  return string;
};
/**
 * escape RegEx
 * @param text
 * @returns {string | * | void}
 */
exports.escapeRegEx = function (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
/**
 * Trims semi column
 * @param string
 * @returns {string | * | void}
 */
exports.trimLastSemiColumn = function (string) {
  string = string.replace(/;\s*$/, '');
  return string;
};
/**
 * Deep Delete
 * @param obj
 * @param field
 */
exports.deepDeleteFields = function (obj, field) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('Provide a valid object');
  }
  if (Array.isArray(field)) {
    field.forEach((f) => {
      if (!exports.isNull(obj[f])) {
        delete obj[f];
      }
    });
  }
  else if (!exports.isNull(obj[field])) {
    delete obj[field];
  }
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      exports.deepDeleteFields(obj[key], field);
    }
  });
};
/**
 * Returns a random string with given possible characters
 * @param lengthOfString
 * @param setOfPossibleCharacters
 * @returns {string}
 */
exports.makeRandomString = function (lengthOfString, setOfPossibleCharacters) {
  if (exports.isNull(setOfPossibleCharacters)) {
    setOfPossibleCharacters = exports.Constants.RANDOM_PASSWORD_TYPE.ALPHANUMERIC;
  }
  let text = '';
  for (let i = 0; i < lengthOfString; i++) text += setOfPossibleCharacters.charAt(Math.floor(Math.random() * setOfPossibleCharacters.length));
  return text;
};
exports.CONSTANTS = {
  RANDOM_PASSWORD_TYPE: {
    ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    ALPHANUMERIC_LOWER_CASE: 'abcdefghijklmnopqrstuvwxyz0123456789',
    ALPHANUMERIC_UPPER_CASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    ALPHABETIC_UPPER_CASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHABETIC2_UPPER_CASE: 'ABCDEFGHIJKLNOPQRUVWXYZ',
    NUMBER: '0123456789',
  },
  TZ_CITIES: {
    ISTANBUL: 'Europe/Istanbul',
    LONDON: 'Europe/London',
    MOSCOW: 'Europe/Moscow',
    LOS_ANGELES: 'America/Los_Angeles',
  },
};
/**
 * Returns IP Address of request
 * @param req
 * @returns {string}
 */
exports.getIP = function (req) {
  return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : undefined);
};

exports.deepObjectIdToString = function (req) {
  return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : undefined);
};
