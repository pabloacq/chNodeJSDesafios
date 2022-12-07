const {Router} = require('express')
const ProductosRouter = require('./productos')
const ProductosTest = require('./productos-test')
const ChatRouter = require('./chat')

const rutaPrincipal = Router()

rutaPrincipal.use('/productos', ProductosRouter)
rutaPrincipal.use('/productos-test', ProductosTest)
rutaPrincipal.use('/chat', ChatRouter)


module.exports = rutaPrincipal