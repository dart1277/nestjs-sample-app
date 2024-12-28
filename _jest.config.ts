import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseDir}/**/*.ts`],
  // setupFiles: [`${baseDir}/setup.ts`], can set up for ex. env variables here
};

export default config;
