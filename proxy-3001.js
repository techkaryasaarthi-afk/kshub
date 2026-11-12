const http = require('http');

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:3000' }
  };
  const proxyReq = http.request(options, proxyRes => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  req.pipe(proxyReq, { end: true });
  proxyReq.on('error', (err) => {
    res.writeHead(502);
    res.end('Proxying to 3000: ' + err.message);
  });
});

server.listen(3001, '0.0.0.0', () => {
  console.log('Forwarding localhost:3001 -> localhost:3000');
});
