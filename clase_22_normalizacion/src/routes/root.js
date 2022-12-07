const ProductContainer = require('../ProductContainer')
const multer = require('multer')
const express = require('express')

const rutaRoot = express.Router()

rutaRoot.get('/', (req, res) => {
  res.render('index');
});

rutaRoot.get('/productos',async (req, res) => {
  const data = {productos: await ProductContainer.getAll()}
  res.render('productos', data);
});



module.exports = rutaRoot