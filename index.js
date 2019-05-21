const CORE = require('./api');
const MIDDLEWARES = require('./middlewares');

module.exports = {
  ...CORE,
  ...MIDDLEWARES
}
