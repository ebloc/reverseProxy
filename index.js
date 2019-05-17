const path = require('path');

const express = require('express');
const proxy = require('http-proxy-middleware');

// Config
const { routes } = require('./config.json');

const app = express();

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, '/index.html')));
});

for (let route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
      }
    })
  );
}

app.listen(80, () => {
  console.log('Proxy listening on port 80');
});
