module.exports = {
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.tsx?$',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1.ts',
  },
};
