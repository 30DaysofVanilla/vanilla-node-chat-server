const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {

  if(req.url === '/' && req.method === "GET") {
    fs.readFile(path.join(__dirname, '../client', 'index.html'), (err, data) => {
      if(err) {
        res.writeHead(404);
        res.end("Not found, yo");
      } else {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(data);
      }
    })
  }
  if(req.url === '/index.js' && req.method === "GET") {
    fs.readFile(path.join(__dirname, '../client', 'index.js'), (err, data) => {
      if(err) {
        res.writeHead(404);
        res.end("Not found, yo");
      } else {
        res.writeHead(200, {'content-type': 'text/javascript'});
        res.end(data);
      }
    })
  }
  if(req.url === '/styles.css' && req.method === "GET") {
    fs.readFile(path.join(__dirname, '../client', 'styles.css'), (err, data) => {
      if(err) {
        res.writeHead(404);
        res.end("Not found, yo");
      } else {
        res.writeHead(200, {'content-type': 'text/css'});
        res.end(data);
      }
    })
  }
  if (req.url === '/getMessages' && req.method === 'GET'){
    fs.readFile(path.join(__dirname, '/data.json'), (err, data) => {
      if (err){
        console.error(err);
        res.writeHead(404);
        res.end('NO DATA LOL');
      } else {
        res.writeHead(200, {'content-type': 'application/json' });
        console.log('about to send json data homie');
        res.end(data);
      }
    })
  }
   if (req.url === '/postMessage' && req.method === 'POST'){
    let bufferData = [];
    req.on('data', (chunk) => {
      bufferData.push(chunk);
    }).on('end', () =>{ 
      bufferData = Buffer.concat(bufferData).toString()
      console.log(JSON.parse(bufferData))
    });
  }
  

}).listen(8080);

console.log('listening on 8080')