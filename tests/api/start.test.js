const { API } = require('../../api');

const isolated = Object.assign(Object.create(Object.getPrototypeOf(API)), API)

test('API.start(8080)', async () => {
  await expect(isolated.start(8080)).resolves.toBe('OK');
});
