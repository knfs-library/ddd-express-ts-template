import 'dotenv/config';
import { resolve } from 'path';

require('dotenv').config({ path: '.env.test' });
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./tests/api/jest.setup.ts'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFiles: ['dotenv/config'],
	testMatch: [
		"**/__tests__/**/*.ts",
		"**/?(*.)+(spec|test).ts"
	],
	roots: [
		"./tests"
	],
};
