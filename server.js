const http = require('http');
const app = require('./models/app');

const server = http.createServer(app);

const port = (process.env.PORT || 8080);
app.set("port", port);
app.listen(port);
