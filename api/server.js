const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const users = require('../routes/userRoute.js');

const server = express();
server.use(helmet());
server.use(cors());

server.use('api/users', users);
server.get('/', (req, res) => {
    res.send('Server is up and running.');
});

module.exports = server;
