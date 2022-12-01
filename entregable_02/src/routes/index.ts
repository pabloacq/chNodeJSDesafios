import Router, { application } from 'express'
import ApiRouter from './api/'

const rutaPrincipal = Router()

rutaPrincipal.use('/api', ApiRouter)

export default rutaPrincipal
