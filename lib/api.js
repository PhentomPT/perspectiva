const path = require('path');
const express = require('express');
const consola = require('consola');
const colors = require('colors/safe');

function _getCallerFolder () {
  const originalTrace = Error.prepareStackTrace;

  let callerfile;
  try {
    const err = new Error();

    Error.prepareStackTrace = function (err, stack) { return stack; }; // eslint-disable-line handle-callback-err

    let currentfile = err.stack.shift().getFileName();
    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();

      if (currentfile !== callerfile) break;
    }
  } catch (error) { }

  Error.prepareStackTrace = originalTrace;

  return path.dirname(callerfile);
}

const app = express();

const API = class {
  constructor () {
    this.request = app.request;
    this.response = app.response;
    this.routes = null;
  }

  use (middlewares = []) {
    const workdir = _getCallerFolder();
    return new Promise((resolve, reject) => {
      if (!Array.isArray(middlewares)) {
        return reject(new Error('Global middleware list must be an array'));
      }

      try {
        for (let index = 0; index < middlewares.length; index++) {
          if (typeof middlewares[index] === 'string') {
            app.use(require(`${workdir}/${middlewares[index]}`));
          } else {
            app.use(middlewares[index]);
          }
        }
      } catch (error) {
        return reject(new Error(error.message));
      }

      return resolve('OK');
    });
  }

  router (routing = { 'GET /': (req, res) => { res.json('Welcome'); } }) {
    const workdir = _getCallerFolder();

    return new Promise((resolve, reject) => {
      this.routes = routing;

      for (const key in this.routes) {
        const keys = key.split(' ');
        const method = keys[0].toLowerCase();
        const route = keys[1];
        let middlewares = [];
        let controller = null;

        if (Array.isArray(this.routes[key])) {
          const routes = this.routes[key];

          if (routes.length === 0) {
            return reject(new Error(`At least one controller needs to be specified for route: ${colors.red(`${method} ${route}`)}`));
          } else if (routes.length === 1) {
            controller = this.routes[key][0];
          } else {
            middlewares = routes.slice(0, routes.length - 1);
            controller = routes.slice(routes.length - 1, routes.length)[0];
          }
        } else {
          controller = this.routes[key];
        }

        middlewares = [...middlewares];

        try {
          for (let index = 0; index < middlewares.length; index++) {
            if (typeof middlewares[index] === 'string') {
              middlewares[index] = require(`${workdir}/${middlewares[index]}`);
            }
          }

          if (typeof controller === 'string') {
            controller = require(`${workdir}/${controller}`);
          }

          app[method](route, middlewares, controller);
        } catch (error) {
          return reject(new Error(error.message));
        }
      }

      return resolve('OK');
    });
  }

  start (port) {
    return new Promise((resolve) => {
      app.listen(port, () => {
        consola.success('App is running!');
        return resolve('OK');
      });
    });
  }
};

module.exports = {
  API: new API(),
  CONSOLA: consola,
  COLORS: colors
};
