const Contenedor = require('../../Contenedor')
const Producto = require('../../Producto')
const multer = require('multer')
const express = require('express')


const rutaProductos = express.Router()

function getProductContainer() {
  return new Contenedor('productos.json')
}

function upload(req, res, next) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  return upload.single('thumbnail')(req,res,next)
}

rutaProductos.get('/', (req, res) => {
  res.json(getProductContainer().getAll())
})

rutaProductos.get('/:id', async (req, res) => {
  const ID = req.params.id
  try {
    if (!Producto.isValidID(ID)) {
      res.status(400).send({ error: "ID no valido" })
      return
    }
    const product = await getProductContainer().getByID(ID)
    res.status(product ? 200 : 404).send(product || { error: "Producto no encontrado" })
  } catch (error) {
    return res.status(error.status || 500).send(error)
  }
})

rutaProductos.post('/', (req, res, next) => {upload(req,res,next)}, async (req, res) => {
  try {
    const thumbnail = req.file ? req.file.path.replace('public/', '/') : "default.jpg"
    const producto = new Producto({ ...req.body, thumbnail: thumbnail })
    await getProductContainer().save(producto)
    res.redirect('/')
  } catch (error) {
    res.status(error.status || 500).send(error)
  }
})


rutaProductos.put('/:id', async (req, res) => {
  try {
    const producto = new Producto({ ...req.body, id: req.params.id })
    const productoReturn = await getProductContainer().update(producto)
    res.send(productoReturn)
  } catch (error) {
    res.status(error.status || 500).send(error)
  }
})

rutaProductos.delete('/:id', async (req, res) => {
  try {
    const ID = req.params.id
    if (!Producto.isValidID(ID)) {
      res.status(400).send({ error: "ID no valido" })
      return
    }
    const product = await getProductContainer().deleteById(ID)
    res.json(product)
  } catch (error) {
    res.status(error.status || 500).send(error)
  }
})


module.exports = rutaProductos