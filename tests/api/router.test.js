/* eslint-disable no-undef */
const { API } = require('../../lib/api');

test('API.router()', async () => {
  await expect(API.router()).resolves.toBe('OK');
});

test('API.router({\'GET /\': [ require(\'./resources/middleware\'), require(\'./resources/controller\') )', async () => {
  await expect(API.router({
    'GET /': [ require('../resources/middleware'), require('../resources/controller') ]
  })).resolves.toBe('OK');
});

test('API.router({\'GET /\': [\'./middleware\', \'./controller\'] })', async () => {
  await expect(API.router({
    'GET /': ['../resources/middleware', '../resources/controller']
  })).resolves.toBe('OK');
});

test('API.router({\'GET /\': []})', async () => {
  await expect(API.router({
    'GET /': []
  })).rejects.toThrow(Error);
});

test('API.router({\'GET /\': [\'controller_does_not_exist\']})', async () => {
  await expect(API.router({
    'GET /': ['controller_does_not_exist']
  })).rejects.toThrow(Error);
});
