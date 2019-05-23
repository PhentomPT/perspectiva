/* eslint-disable no-undef */
const { API } = require('../../lib/api');

test('API.use()', async () => {
  await expect(API.use()).resolves.toBe('OK');
});

test('API.use([])', async () => {
  await expect(API.use([])).resolves.toBe('OK');
});

test('API.use(undefined)', async () => {
  await expect(API.use(undefined)).resolves.toBe('OK');
});

test('API.use([Function])', async () => {
  await expect(API.use([(req, res) => {
    res.json('WORKING');
  }])).resolves.toBe('OK');
});

test('API.use(null)', async () => {
  await expect(API.use(null)).rejects.toThrow(Error);
});

test('API.use(asdasd)', async () => {
  await expect(API.use('asdasd')).rejects.toThrow(Error);
});

test('API.use([asdasd])', async () => {
  await expect(API.use(['asd'])).rejects.toThrow(Error);
});
