const http = require('http'),
    server = http.createServer,
    path = require('path'),
    fs = require('fs');

const config = {
    '/': 'index.html',
    '/about': 'about.html',
    '/list': 'list.html',
    'none': '404.html',
}

let getHtml = (url) => {
    return fs.readFileSync(path.resolve(__dirname + '/html/' + (config[url] ? config[url] : config['none']))).toString()
}

let callBack = (req, res) => {
    if (req.url) {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(getHtml(req.url))
        return;
    }
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(getHtml('/'))
}

server(callBack).listen(3000, () => {
    console.log('run HttpServer !');
})