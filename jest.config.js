module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/single_news/.*|(\\.|/)(test|spec))\\.tsx?$',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testTimeout: 600000,
    moduleNameMapper: {
        '@helpers/(.*)': '<rootDir>/src/helpers/$1',
        '@api/(.*)': '<rootDir>/src/api/$1',
        '@bodyGenerator/(.*)': '<rootDir>/src/body-generator/$1',
        '@data/(.*)': '<rootDir>/src/data/$1'
    },
    testPathIgnorePatterns: ['<rootDir>/cypress/']
}
