module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?*.test.unit.+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
