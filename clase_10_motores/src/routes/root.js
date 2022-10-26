const Contenedor = require('../Contenedor')
const Producto = require('../Producto')
const multer = require('multer')
const express = require('express')

const rutaRoot = express.Router()

rutaRoot.get('/', (req, res) => {
    const data = {
      titulo: 'Hello World!',
      mensaje: 'Hello World message!',
    };
    res.render('index', data);
  });

module.exports = rutaRoot