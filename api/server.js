const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/router');
const postRouter = require('./posts/router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

// Adjusted CATCHALL to handle non-existing routes properly
server.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = server;
