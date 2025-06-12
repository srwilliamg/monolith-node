const http = require('http');
const fs = require('fs');

const logFile = '/home/ec2-user/app/access.log';

const server = http.createServer((req, res) => {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - ${req.headers['user-agent']}\n`;

  // Append log entry to file
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Failed to write log:', err);
  });

  try {
    if (req.url === '/hello' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World\n');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found\n');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error\n');
  }
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
