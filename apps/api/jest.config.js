module.exports = {
  verbose: true,
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '.*\\.spec\\.(t|j)s$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
    '@/(.*)': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: ['<rootDir>/src/main.ts', '.module.ts', '.mock.ts'],
  coverageDirectory: 'coverage',
};
