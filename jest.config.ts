import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Nếu có file setup
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Thêm dòng này để Jest hiểu alias '@'
  },
}

export default createJestConfig(customJestConfig)
