module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?*.test.integration.+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
