const Utils = require('../Utils')




const {Router} = require('express')
const RootRouter = require('./root')
const ApiRouter = require('./api/api')

const rutaPrincipal = Router()





rutaPrincipal.use('/', RootRouter)
rutaPrincipal.use('/api', ApiRouter)



module.exports = rutaPrincipal


