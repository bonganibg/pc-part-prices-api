const http = require('http');
const app = require('./models/app');

const server = http.createServer(app);

const port = (process.env.port || 8080);
app.set("port", port);
server.listen(port);