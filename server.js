const http = require('http');
const app = require('./models/app');

const server = http.createServer(app);

const port = (process.env.port || 5000);
app.set("port", port);
server.listen(port);