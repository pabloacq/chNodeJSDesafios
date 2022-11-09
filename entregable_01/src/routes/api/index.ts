import Router from 'express'
import ProductosRouter from './productos'
import rutaCart from './cart'

const rutaPrincipal = Router()

rutaPrincipal.use('/productos', ProductosRouter)
rutaPrincipal.use('/carrito', rutaCart)

export default rutaPrincipal
