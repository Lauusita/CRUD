require('dotenv').config()
require('./src/database')

const Server = require('./src/server')


const server = new Server()

server.listen()