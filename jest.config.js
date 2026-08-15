export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: ['**/tests/**/*.test.js', '**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  verbose: true,
  testTimeout: 10000
};
