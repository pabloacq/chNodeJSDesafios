import { getAllJSDocTags } from 'typescript'
import CartFileSystem from './CartFileSystem'
import CartFireStore from './CartFireStore'
import CartMongoDB from './CartMongo'

import ProductFileSystem from './ProductFileSystem'
import ProductFireStore from './ProductFireStore'
import ProductMongoDB from './ProductMongo'



export const {daoProducto, daoCart} = getDaos()

function getDaos(){
    const DB = process.env.DB
    console.debug(`getDaos: DB = ${DB}`)
    switch (DB) {
        case "Firestore":
            return {"daoProducto": ProductFireStore, "daoCart":CartFireStore}
        case "MongoDB":
            return {"daoProducto":ProductMongoDB, "daoCart":CartMongoDB}
        case "FileSystem":
            return {"daoProducto":ProductFileSystem, "daoCart":CartFileSystem}
        default:
            return {"daoProducto":ProductFileSystem, "daoCart":CartFileSystem}
    }
}
