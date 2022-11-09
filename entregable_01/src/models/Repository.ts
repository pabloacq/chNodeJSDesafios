import Ajv, { ErrorObject } from "ajv"
import Contenedor, {containerElement} from "../services/fileStore";

const ajv = new Ajv();

type validationResult = { valid: boolean, errors?: ErrorObject[] | null | undefined }

export interface iEntity extends containerElement{ 
  timestamp?: number | string
}

export abstract class Repository<T extends iEntity> {
    private schema = {}
    private contenedor
    constructor(schema: object) {
        this.schema = schema
        this.contenedor = new Contenedor<T>(this.constructor.name)
    }

    private async isValid(entity: T): Promise<validationResult> {
        return { valid: await ajv.validate(this.schema, entity), errors: ajv.errors }
    }

    async save(ent: T): Promise<string> {
      const validationData = await this.isValid(ent)
        if (validationData.valid){
          ent.timestamp = Date.now()
            const obj = await this.contenedor.save(ent)
            return  obj.id as string
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
      const validationData = await this.isValid(ent)
      if (!validationData.valid){
        console.log(validationData.errors)
        throw {status: 422, message: "JSON Data Invalid"}
      }
      ent.timestamp = Date.now()
      return this.contenedor.update(ent) 
    }

    async deleteAll(){
      await this.contenedor.deleteAll()
    }

    async deleteByID(id:string):Promise<T>{
      return await this.contenedor.deleteById(id) as T
    }
}