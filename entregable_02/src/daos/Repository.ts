import Ajv, { ErrorObject } from "ajv"
import {iContainerElement, iContainerConstructor} from '../services/Store'

const ajv = new Ajv();



type validationResult = { valid: boolean, errors?: ErrorObject[] | null | undefined }

export interface iEntity extends iContainerElement{ 
  timestamp?: number | string,
  _id?: string
}

export abstract class Repository<T extends iEntity> {
    private schema = {}
    private contenedor

    constructor(schema: object,ctor:iContainerConstructor<T>,name:string ) {
        this.schema = JSON.parse(JSON.stringify(schema))
        this.contenedor = new ctor(name, schema)
    }

    private async isValid(entity: T): Promise<validationResult> {
      console.log(this.schema)
        return { valid: await ajv.validate(this.schema, entity), errors: ajv.errors }
    }

    async save(ent: T): Promise<string> {
      const validationData = await this.isValid(ent)
        if (validationData.valid){
            ent.timestamp = Date.now()
            const obj = await this.contenedor.save(ent)
            return  obj._id as string
        }
        else{
          console.log(validationData.errors)
          throw {status: 422, message: "JSON Data Invalid"}
        }
    }

    async getByID(id:string): Promise<T> {
        const a = await this.contenedor.getByID(id) 
        return a
    }

    async getAll(): Promise<Array<T>>{
        return await this.contenedor.getAll()
    }

    async update(ent: T):Promise<T>{
      let validationData

      console.debug(`Repository.update: Using schema ${JSON.stringify(this.schema)}`)
      
      if (ent._id){
        ent._id = ent._id?.toString()
      }
      

      console.log(`${typeof ent._id}`)
      
      console.debug(`Validating ${JSON.stringify(ent)}`)
      try {
        validationData = await this.isValid(ent)
      } catch (error) {
        console.error(`Validation error: ${error}`)
        console.log(JSON.stringify(validationData == undefined))
      }
      
      if (validationData==undefined || !(validationData == undefined) && !validationData.valid){
        console.log(`ID: ${ent._id as string} TypeOf: ${typeof ent._id}`)
        console.debug(`ENT Invalid ${JSON.stringify(validationData?.errors)}`)
        console.debug(`${JSON.stringify(ent)}`)
        console.debug(`Schema: ${JSON.stringify(this.schema)}`)
        throw {status: 422, message: "JSON Data Invalid"}
      }
      ent.timestamp = Date.now()
      console.debug(`ENT Valid, updating: ${JSON.stringify(ent)}`)
      return this.contenedor.update(ent) 
    }

    async deleteAll(){
      await this.contenedor.deleteAll()
    }

    async deleteByID(id:string):Promise<T>{
      return await this.contenedor.deleteById(id) as T
    }
}