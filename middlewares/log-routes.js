const { API, CONSOLA, COLORS } = require('../api');

module.exports = (req = API.request, res = API.response, next) => {
  let color = 'white';
  switch (req.method) {
    case 'GET':
      color = 'green';
      break;
    case 'POST':
      color = 'yellow';
      break;
    case 'PUT':
      color = 'blue';
      break;
    case 'DELETE':
      color = 'red';
      break;
    default:
      color = 'gray'
      break;
  }

  CONSOLA.info(`${COLORS[color](req.method)} ${req.url}`);

  next();
}
