const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    rootDir: '.',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/app/(.*)$': '<rootDir>/app/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customJestConfig)
