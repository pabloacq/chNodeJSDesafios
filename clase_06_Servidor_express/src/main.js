const Contenedor = require('./Contenedor')
const Utils = require('./Utils')
const express = require('express')
const app = express()

const PORT = 8080

products = new Contenedor('productos.json')

app.get('/', (req, res) => {
  res.json({mensaje:'Nada por aqui', })
})

app.get('/productos', (req, res) => {
  res.json(productos.getAll())
})

app.get('/productoRandom', async (req, res) => {
  const count = await products.count()
  const randomID = Utils.generateRandomInteger(count,1)
  console.log(`Random ID: ${randomID}`)
  const randomProduct = await products.getByID(randomID)
  res.json(randomProduct)
})

const server = app.listen(PORT, ()=>{
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))
