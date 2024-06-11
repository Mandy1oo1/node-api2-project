// implement your server here
// require your posts router and connect it here
// api/server.js
const express = require('express');
const cors = require('cors');
const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Blog Posts API</h2>');
});

module.exports = server;

