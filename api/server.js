const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use('/api/users', userRouter)

// CATCHALL
server.use('*', (req, res) => {
	res.status(200).json({message: 'server up and running'})
})

module.exports = server
