module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/main.(t|j)s',
    '!src/app.service.(t|j)s',
    '!src/app.module.(t|j)s',
    'src/ports/**/*.(t|j)s',
    '!src/ports/http/v1/dto/**/*.(t|j)s',
    '!src/application/**/*.(t|j)s',
    '!src/domain/**/*.(t|j)s',
    '!src/infrastructure/**/*.(t|j)s',
  ],
  coverageDirectory: 'reports/coverage-result/e2e',
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  reporters: [
    'default',
    [
      'jest-stare',
      {
        log: false,
        resultDir: 'reports/test-result/e2e',
        reportSummary: false,
        reportTitle: 'E2E Testing Results',
        reportHeadline: 'E2E Testing Results',
        additionalResultsProcessors: ['jest-junit'],
        coverageLink: '../../coverage-result/e2e/lcov-report/index.html',
        jestStareConfigJson: 'jest-stare.json',
        jestGlobalConfigJson: 'globalStuff.json',
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: 'reports/test-result/junit',
        outputName: 'e2e.xml',
      },
    ],
  ],
  testRegex: '.*\\.e2e\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
};
