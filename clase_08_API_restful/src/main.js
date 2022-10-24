const Contenedor = require('./Contenedor')
const Utils = require('./Utils')
const Producto = require('./Producto')
const express = require('express')
const multer = require('multer')
const { restart } = require('nodemon')
const app = express()

const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const rutaProductos = express.Router()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

function getProductContainer() {
  return new Contenedor('productos.json')
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
    const producto = new Producto({ ...req.body, thumbnail: req.file ? req.file.path : "no-img.jpg" })
    await getProductContainer().save(producto)
    res.send(producto)
  } catch (error) {
    res.status(error.status || 500).send(error)
  }
})

rutaProductos.put('/:id', (req, res, next) => {upload(req,res,next)}, async (req, res) => {
  try {
    const producto = new Producto({ ...req.body, thumbnail: req.file ? req.file.path : undefined, id: req.params.id })
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

function upload(req, res, next) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  upload.single('thumbnail')(req,res,next)
}

app.use('/api/productos', rutaProductos)

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))
