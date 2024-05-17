/* eslint-disable */

export default () => ({
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    "@services/(.*)": ["<rootDir>/services/$1"],
    "@config": ["<rootDir>/config/index.ts"],
    "@custom-types/(.*)": ["<rootDir>/types/$1"],
    "@repositories/(.*)": ["<rootDir>/repositories/$1"],
    "@controllers/(.*)": ["<rootDir>/controllers/$1"],
    "@routes/(.*)": ["<rootDir>/routes/$1"],
    "@middlewares/(.*)": ["<rootDir>/middlewares/$1"],
    "@db/(.*)": ["<rootDir>/lib/db/$1"],
    "@logger": ["<rootDir>/lib/logger/index.ts"],
    "@events": ["<rootDir>/lib/events/index.ts"]
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '^.*\\.module\\.[jt]s?$',
    '^.*\\.schema\\.[jt]s?$',
    '^.*\\.interface\\.[jt]s?$',
    '^.*\\.enum\\.[jt]s?$',
    '^.*\\.constant\\.[jt]s?$',
    '^.*\\.dto\\.[jt]s?$',
    '/src/lib/logger/',
    '/src/lib/db/',
  ],
  setupFilesAfterEnv: ['../setup-jest.ts', '<rootDir>/lib/db/prisma-client.mock.ts'],
});
