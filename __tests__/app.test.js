const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('discord-sandbox routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should be true', () => {
    expect(true).toEqual(true);
  });
});
