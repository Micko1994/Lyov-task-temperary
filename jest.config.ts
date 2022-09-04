import type { Config } from '@jest/types';

const SRC_PATH: string = '<rootDir>/src';
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  roots: [SRC_PATH],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: ['<rootDir>/**/?(*.)+(test).[jt]s?(x)'],
  modulePaths: [SRC_PATH],
  errorOnDeprecated: true,
  verbose: true,
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json'
  ],
};

export default config;
