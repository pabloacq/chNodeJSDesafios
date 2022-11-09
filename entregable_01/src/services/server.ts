import express from 'express'
import mainRoute from '../routes'
import path from 'path'
import http from 'http'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);

app.use('/', mainRoute)

export const HTTPServer = new http.Server(app)

