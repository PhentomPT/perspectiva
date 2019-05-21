# perspectiva

A framework wrapper to improve development startup time while adding helpful features and maintaining autocompletion

```javascript
const { API } = require('perspectiva');

API.router({
  'GET /': (req = API.request, res = API.response) => {
    res.json('Hello World')
  }
})
.then(API.start(3000))
```

## Installation
```
$ npm i perspectiva
```
