const Contenedor = require('./Contenedor')
const Utils = require('./Utils')
const Producto = require('./Producto')
const express = require('express')
const multer = require('multer')
const app = express()

const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const rutaProductos = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

function getProductContainer() {
  return new Contenedor('productos.json')
}

rutaProductos.get('/', (req, res) => {
  res.json(getProductContainer().getAll())
})

rutaProductos.get('/:id', async (req, res) => {
  const ID = req.params.id
  if (Producto.isValidID(ID)) {
    res.status(400).send({ error: "Producto no encontrado" })
    return
  }
  const product = await getProductContainer().getByID(ID)
  res.status(product ? 200 : 404).send(product || { error: "Producto no encontrado" })
})

rutaProductos.post('/', upload.single('thumbnail'), async (req, res) => {
  try {
    const producto = new Producto({...req.body, thumbnail:req.file.path})
    await getProductContainer().save(producto)
    res.send(producto)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

rutaProductos.put('/', async (req, res) => {
  const producto = new Producto(req.body)
  await getProductContainer().update(producto)
  res.send(getProductContainer().getAll())
})

rutaProductos.delete('/:id', async (req, res) => {
  const ID = req.params.id
  const product = await getProductContainer().deleteById(ID)
  res.json(product)
})

app.use('/api/productos', rutaProductos)

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))
