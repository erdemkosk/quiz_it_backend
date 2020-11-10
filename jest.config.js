/* eslint-disable no-sparse-arrays */
const coverageDirectories = [
  'constants',
  'data',
  'formatter',
  'logic',,
  'server/controllers',
  'server/routes',
  'server/services',
  'test',
];

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [`src/{${coverageDirectories.join(',')}}/**/*.{js,jsx,ts,tsx}`],
  coverageDirectory: './coverage/',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};
