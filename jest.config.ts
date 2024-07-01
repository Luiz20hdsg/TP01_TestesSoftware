import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './',
    testEnvironment: 'node',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>/',
        }),
        '@core/(.*)': '<rootDir>/src/core/$1',
        '@infra/(.*)': '<rootDir>/src/infra/$1',
        '@helpers/(.*)': '<rootDir>/src/helpers/$1',
        '@test/(.*)': '<rootDir>/test/$1',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
