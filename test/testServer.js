const app = require('./app')
const axios = require('axios');
const http = require('http')
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT)