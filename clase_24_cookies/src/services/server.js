const express = require('express')
const mainRoute = require('../routes')
const path = require('path');
const http = require('http');
const io = require('socket.io');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
// const sessionStorage = require('../session')

const app = express()

const ttlSeconds = 60

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://coder01:ylaXIPwarWfgd0sx@cluster0.lilcpop.mongodb.net/?retryWrites=true&w=majority',
    ttl: ttlSeconds * 1000,
    crypto: {
      secret: '1234',     
    },
  }),
  secret: 'secretString', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))



app.use(cookieParser())
app.use(session(StoreOptions))



const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);

app.use('/', mainRoute)

const myHTTPServer = http.Server(app)

const myWebSocketServer = io(myHTTPServer)

module.exports = {
  HTTPServer: myHTTPServer,
  webSocketServer: myWebSocketServer
};

