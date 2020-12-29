const APIKEY = process.env.APIKEY || "XXX";

const https = require('https'),
      http = require("http"),
      url = require("url"),
      path = require("path"),
      fs = require("fs"),
      port = 3000,
      hostname = '127.0.0.1',
      options = {
        'method': 'GET',
        'hostname': 'api.unsplash.com',
        'path': '/photos/random?client_id='+APIKEY+'&count=30&h=100&q=80&orientation=landscape',
      };

let page = 1;


const readFromCacheOrRetrieve = (callback) => {
    fs.readFile("cache/data" + page + ".json", (error, json) => {
      if(error) {
        retrieve(callback)
      }
      else {
        let obj = JSON.parse(json);
        page++
        callback(obj)
      }
    })
}

const retrieve = (callback) => {
  
  const fetch = https.request(options, function (res) {
    if(res.statusCode !== 200) return callback([])
    let chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      let body = Buffer.concat(chunks);
      fs.writeFile("cache/data" + page + ".json", body.toString(), (err) => {
        if (err) console.error(err)
        page++
        callback(JSON.parse(body))
      });
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  fetch.end()
}



http.createServer(function(request, response) {
  if((request.url === '/' || request.url === '/index.html') && request.method === 'GET') {
    page=1;
  }
  if(request.url === '/api' && request.method === 'GET') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    return readFromCacheOrRetrieve((obj) => response.end(JSON.stringify(obj)))
  }

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
    fs.access(filename, fs.constants.F_OK, function(err) {
    if(err) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

	if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      let mime = "text/html";
      switch(filename.substring(filename.indexOf('.')  +1)) {
        case 'js':
          mime = "text/javascript"
          break;
        case 'css':
          mime = "text/css"
          break;
      }
      response.writeHead(200, {"Content-Type": mime});
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});