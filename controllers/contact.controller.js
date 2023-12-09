const fs = require('fs');

function index(req, res){
  const readStream = fs.createReadStream('./views/contact.html', 'utf-8');
  readStream.on('data', (data) => {    
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(data);
    })
}

module.exports = {index}