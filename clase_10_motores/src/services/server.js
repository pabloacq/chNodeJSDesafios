const express = require('express')
const mainRoute = require('../routes')
const path = require('path');

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);

app.use('/', mainRoute)

module.exports = app;
