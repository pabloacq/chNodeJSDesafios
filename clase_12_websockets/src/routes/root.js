const ProductContainer = require('../ProductContainer')
const multer = require('multer')
const express = require('express')

const rutaRoot = express.Router()

rutaRoot.get('/', (req, res) => {
  res.render('index');
});

rutaRoot.get('/productos', (req, res) => {
  const data = {productos: ProductContainer().getAll()}
  res.render('productos', data);
});



module.exports = rutaRoot