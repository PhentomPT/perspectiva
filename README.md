# perspectiva

A framework wrapper to improve development startup time while adding helpful features and maintaining autocompletion

## Installation
```
$ npm i @phentompt/perspectiva
```

## Usage
```javascript
const { API } = require('@phentompt/perspectiva');

API.router({
  'GET /': (req = API.request, res = API.response) => {
    res.json('Hello World');
  }
})
.then(API.start(3000));
```

### Global Middlewares
One or more global middlewares can be attached to the API with the **use** function.

Note that **'/middlewares/another'** will be loaded as a well.

```javascript
const { API, CONSOLA } = require('@phentompt/perspectiva');

API.use([
  (req = API.request, res = API.response, next) => {
    CONSOLA.info('A global middleware');
    next();
  },
  '/middlewares/another'
])
.then(router({
  'GET /': (req = API.request, res = API.response) => {
    res.json('Controller reached');
  }
}))
.then(API.start(3000));
```

### Route Specific Middlewares
One or more specific middlewares can be attached to each route.

Note that **'/middlewares/another'** will be loaded as a well.

```javascript
const { API, CONSOLA } = require('@phentompt/perspectiva');

API.use([])
.then(router({
  'GET /': [
  (req = API.request, res = API.response, next) => {
    CONSOLA.info('A specific middleware');
    next();
  },
  '/middlewares/another',
  (req = API.request, res = API.response) => {
    res.json('Controller reached');
  }]
}))
.then(API.start(3000));
```

### Clean up
```javascript
const { API, CONSOLA } = require('@phentompt/perspectiva');

API.use([
  '/middlewares/global'
])
.then(router({
  'GET /': ['/middlewares/specific', 'controllers/home']
  'POST /': ['/middlewares/specific', 'controllers/home_post']
}))
.then(API.start(3000));
```
