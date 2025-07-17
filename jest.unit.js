const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: false,
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testMatch: ['**/src/**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  coveragePathIgnorePatterns: [
    'src/main.ts',
    'src/core/*',
    'jwt.service.ts',
    '.*\\.datasource\\.ts$',
    '.*\\.dto\\.ts$',
    '.*\\.module\\.ts$',
  ],
  coverageDirectory: 'coverage/unit',
  resetMocks: true,
  clearMocks: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage/unit',
        outputName: 'junit.xml',
        suiteName: 'Unit Tests',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
      },
    ],
  ],
  coverageReporters: ['lcov', 'text'],
};

export default config;
