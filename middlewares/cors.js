const { API } = require('../api');

module.exports = (options = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  headers: 'Content-Type, authorization'
}) => {
  return (req = API.request, res = API.response, next) => {
    res.header('Access-Control-Allow-Origin', options.origin);
    res.header('Access-Control-Allow-Methods', options.methods);
    res.header('Access-Control-Allow-Headers', options.headers);

    next();
  }
}
