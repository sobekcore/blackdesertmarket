module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  verbose: true,
  rootDir: '.',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'cjs', 'vue'],
  testMatch: ['**/src/**/*.spec.(t|j)s'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s', '<rootDir>/src/**/*.vue'],
  coveragePathIgnorePatterns: ['<rootDir>/src/layouts', '<rootDir>/src/main.ts', '<rootDir>/src/App.vue'],
  coverageDirectory: 'coverage',
};
