const Producto = require('../../Producto')
const express = require('express')
const { faker } = require('@faker-js/faker/locale/es_MX');

const rutaProductos = express.Router()


rutaProductos.get('/', async (req, res) => {
    const returnArray = new Array

  for (let i= 0; i<5;i++){
    try {
        returnArray.push(createRandomProduct())
    } catch (error) {
        console.log(error)
    }
        
  }
  res.send(returnArray)
    
})

function createRandomProduct(){
    return new Producto({
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
        id: faker.datatype.uuid()
    }
    )
}

module.exports = rutaProductos