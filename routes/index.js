const fs = require('fs');
const formidable = require('formidable');
const routes = {
  'GET' : {
    '/': (req, res) => {
      const {index} = require('../controllers/index.controller.js');
      index(req, res);
    },
    '/about' : (req, res) => {
      const {index} = require('../controllers/about.controller.js');
      index(req, res);
    },
    '/contact': (req, res) => {
      const {index} = require('../controllers/contact.controller.js');
      index(req, res);
    }
  },

  'POST': {
    '/api/upload': (req, res) => {
      var form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if(err) {
          res.writeHead(500, {'Content-type' : 'application/json'})
          res.end('Something went wrong..!')
        }
        let img = files.image[0];
        let oldpath = img.filepath;
        let contentType = img.mimetype;
        const allowFileTypes = ['jpg', 'png'];
        if(contentType.includes('image')) {
          let extension = contentType.split('/')[1];
          if(allowFileTypes.includes(extension)) {
            let newpath = './' + new Date() + '.' + extension;
            fs.rename(oldpath, newpath, function (err) {
              if (err) {
                res.writeHead(500, {'Content-type': 'text/plain'});
                res.end('Something Went Wrong in saving..');
              } else {
                res.write('File uploaded successfully!');
                res.end();
              }
          });
          }
        } else {
          res.writeHead(413, {'Content-type': 'text/plain'});
          res.end('Only Accept image files with jpg or png');
        }
      })
    },
  },
}

module.exports = routes;