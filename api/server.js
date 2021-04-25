const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const users = require('../routes/userRoute.js');
const recipes = require('../routes/recipeRoute.js');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', users);
server.use('/api/recipes', recipes);

server.get('/', (req, res) => {
    res.send('Server is up and running.');
});

module.exports = server;
