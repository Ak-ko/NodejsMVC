const http = require('http');
const routes = require('./routes');

const server = http.createServer((req, res) => {
  let method = req.method;
  let url = req.url;
  if(Object.keys(routes[method]).includes(url)) {
    routes[method][url](req,res);
  }
})

server.listen(3000, () => console.log('I love you 3000'));