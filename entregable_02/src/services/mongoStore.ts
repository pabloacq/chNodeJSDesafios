import mongoose from 'mongoose'
import {iContainerElement, iContenedor} from './Store'

import {mongoDbConnectionString as connectionString} from '../config'

export default class Contenedor<T extends iContainerElement> implements iContenedor<T> {
    private connectionString = connectionString
    private schema: mongoose.Schema<object>
    private model: mongoose.Model<object>


    constructor(collection: string, schema: any) {
        this.initMongodb()
        console.log(`Schema received at mongoStore${JSON.stringify(schema)}`)
        const newSchema = {...schema}
        delete newSchema.properties['_id']
        this.schema = new mongoose.Schema(newSchema.properties, { "timestamps": true })
        this.model = mongoose.model(collection, this.schema)
    }

    private async initMongodb() {
        try {
            console.debug(`Conectando a DB... ${this.connectionString}`)
            await mongoose.connect(this.connectionString)
        }
        catch (e) {
            console.error(e)
            return e
        }
    }

    private async disconnect() {
        try {
            console.debug('Desconectando de DB...')
            await mongoose.disconnect()
            console.debug('Desconectado de DB...')
        } catch (e) {
            console.error(e)
            return e
        }
    }

    async count(): Promise<number> {
        return this.model.count()
    }

    async save(newObject: any):Promise<T> {
        const a = await this.model.create(newObject)
        console.debug(`Modelo creado ${JSON.stringify(a)}`)
        return a as T
    }

    async getByID(id: string):Promise<T> {
        const returnValue = await this.model.findOne({ _id: id }) 
        return returnValue as unknown as T
    }

    async getAll():Promise<T[]> {
        return await this.model.find() as T[]
    }

    async deleteById(id: string):Promise<T> {
        return await this.model.findOneAndDelete({ _id: id }) as T
    }

    async deleteAll():Promise<void>{
        this.model.collection.drop()
    }

    async update(object:any):Promise<T>{
        console.log(`Object received at update: ${JSON.stringify(object)}`)
        object.timestamp="000000"
        const a =  await this.model.findOneAndUpdate({_id:object._id}, {...object}, {new:true})
        console.log(`Update: ${JSON.stringify(a)}`)
        return a as T
    }
}


// const schema = {
//     // type: "object",
//     // additionalProperties: false,
//     properties: {
//         _id: { "type": "string", "required": false },
//         nombre: { type: "string", "required": true },
//         descripcion: { type: "string", "required": true },
//         codigo: { type: "string" },
//         precio: { type: "number" },
//         foto: { type: "string" },
//         stock: { type: "number" },
//     }
// }




// export async function test() {
//     const prodRepo = new mongoStore(schema, "products")
//     const prod = { nombre: "Producto nuevo", descripcion: "Descripcion del prod", precio: 100 }

//     const prod2 = {_id:'6385687376dc37b6c8638953' , precio: 900 }

//     prodRepo.save(prod)

//     const id = '6385748d6c802088f85cc4f7'
//     console.info(await prodRepo.getByID(id))

//     // console.debug("Updating...")
//     // console.info(await prodRepo.update(prod2))

//     // console.info(await prodRepo.deleteAll())
//     // console.debug("deleted!")

//     // console.info(`Deleted... ${JSON.stringify(await prodRepo.deleteById(id))}`)
// }