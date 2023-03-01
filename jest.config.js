module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/main.(t|j)s',
    '!src/app.service.(t|j)s',
    '!src/app.module.(t|j)s',
    '!src/ports/**/*.(t|j)s',
    '!src/ports/http/v1/dto/**/*.(t|j)s',
    'src/application/**/*.(t|j)s',
    '!src/domain/**/*.(t|j)s',
    'src/infrastructure/**/*.(t|j)s',
    '!src/infrastructure/exceptions/**/*.(t|j)s',
  ],
  coverageDirectory: 'reports/coverage-result/unit',
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  reporters: [
    'default',
    [
      'jest-stare',
      {
        log: false,
        resultDir: 'reports/test-result/unit',
        reportSummary: false,
        reportTitle: 'Unit Testing Results',
        reportHeadline: 'Unit Testing Results',
        additionalResultsProcessors: ['jest-junit'],
        coverageLink: '../../coverage-result/unit/lcov-report/index.html',
        jestStareConfigJson: 'jest-stare.json',
        jestGlobalConfigJson: 'globalStuff.json',
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: 'reports/test-result/junit',
        outputName: 'unit.xml',
      },
    ],
  ],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
};
